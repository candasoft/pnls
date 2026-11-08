import { floorBooths } from "@/components/exhibition/floor-data";
import type { ExperienceStats } from "@/components/exhibition/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Process-local reporting window. A shared durable store is required for multi-instance hosting.
type Visitor = { seen: number; lastAction: number };
type Store = { started: number; visitors: Map<string, Visitor>; booths: Map<string, number>; stage: number };
const scope = globalThis as typeof globalThis & { experienceStats?: Store };
function store() {
  const now = Date.now();
  // Keep memory bounded and the reporting window at most 24 hours.
  if (!scope.experienceStats || now - scope.experienceStats.started > 86_400_000) {
    scope.experienceStats = { started: now, visitors: new Map(), booths: new Map(), stage: 0 };
  }
  return scope.experienceStats;
}
function snapshot(data: Store): ExperienceStats {
  const topSchools = [...data.booths].map(([id, views]) => ({ id, views, name: floorBooths.find(b => b.id === id)!.name }))
    .sort((a, b) => b.views - a.views || a.name.localeCompare(b.name));
  const zones = new Map<string, number>();
  for (const [id, count] of data.booths) {
    const zone = floorBooths.find(b => b.id === id)!.zone;
    zones.set(zone, (zones.get(zone) || 0) + count);
  }
  return {
    startedAt: new Date(data.started).toISOString(), updatedAt: new Date().toISOString(),
    online: [...data.visitors.values()].filter(v => Date.now() - v.seen < 60_000).length,
    visitors: data.visitors.size, boothViews: topSchools.reduce((sum, b) => sum + b.views, 0),
    schoolsExplored: topSchools.length, stageOpens: data.stage, topSchools: topSchools.slice(0, 3),
    topZones: [...zones].map(([name, views]) => ({ name, views })).sort((a, b) => b.views - a.views || a.name.localeCompare(b.name)).slice(0, 3),
  };
}
const headers = { "Cache-Control": "no-store" };
export async function GET() { return Response.json(snapshot(store()), { headers }); }
export async function POST(request: Request) {
  // Only accept activity sent from this website.
  let origin: URL;
  try { origin = new URL(request.headers.get("origin") || ""); }
  catch { return Response.json({ error: "Invalid origin" }, { status: 403 }); }
  if (!["https:", "http:"].includes(origin.protocol) || origin.host !== request.headers.get("host")) return Response.json({ error: "Invalid origin" }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 1024) return Response.json({ error: "Too large" }, { status: 413 });
  let event;
  try {
    const body = await request.text();
    if (body.length > 1024) throw new Error();
    event = JSON.parse(body);
  } catch { return Response.json({ error: "Invalid activity" }, { status: 400 }); }
  if (!event || typeof event.visitor !== "string" || !/^[a-f0-9-]{36}$/.test(event.visitor) ||
    !["heartbeat", "booth", "stage"].includes(event.type) ||
    (event.type === "booth" && !floorBooths.some(b => b.id === event.boothId))) {
    return Response.json({ error: "Invalid activity" }, { status: 400 });
  }
  const data = store();
  const previous = data.visitors.get(event.visitor);
  if (!previous && data.visitors.size >= 100_000) return Response.json({ error: "Reporting capacity reached" }, { status: 503 });
  const visitor = previous || { seen: 0, lastAction: 0 };
  visitor.seen = Date.now();
  // Prevent accidental double clicks from inflating engagement counts.
  if (event.type !== "heartbeat" && Date.now() - visitor.lastAction >= 1000) {
    if (event.type === "booth") data.booths.set(event.boothId, (data.booths.get(event.boothId) || 0) + 1);
    else data.stage++;
    visitor.lastAction = Date.now();
  }
  data.visitors.set(event.visitor, visitor);
  return Response.json(snapshot(data), { headers });
}
