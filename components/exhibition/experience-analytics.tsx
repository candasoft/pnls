"use client";

import { useEffect, useState } from "react";
import type { ExperienceEvent, ExperienceStats } from "./analytics-types";

let memoryId: string | undefined;
function visitorId() {
  if (memoryId) return memoryId;
  try {
    const saved = localStorage.getItem("pls2027:visitor");
    memoryId = saved && /^[a-f0-9-]{36}$/.test(saved) ? saved : crypto.randomUUID();
    localStorage.setItem("pls2027:visitor", memoryId);
  } catch { memoryId = crypto.randomUUID(); }
  return memoryId;
}
export async function recordExperience(event: ExperienceEvent) {
  const response = await fetch("/api/virtual-experience/stats", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...event, visitor: visitorId() }), cache: "no-store", signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Analytics unavailable");
  const stats: ExperienceStats = await response.json();
  window.dispatchEvent(new CustomEvent("experience-stats", { detail: stats }));
  return stats;
}
export function trackExperience(event: ExperienceEvent) { void recordExperience(event).catch(() => {}); }

export function ExperienceAnalytics() {
  const [stats, setStats] = useState<ExperienceStats | null>(null);
  const [offline, setOffline] = useState(false);
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    let active = true;
    async function refresh() {
      if (document.visibilityState !== "visible") return;
      try {
        const next = await recordExperience({ type: "heartbeat" });
        if (active) { setStats(next); setOffline(false); }
      } catch { if (active) setOffline(true); }
    }
    function update(event: Event) {
      if (active) { setStats((event as CustomEvent<ExperienceStats>).detail); setOffline(false); }
    }
    window.addEventListener("experience-stats", update);
    document.addEventListener("visibilitychange", refresh);
    void refresh();
    const timer = setInterval(refresh, 15_000);
    return () => { active = false; clearInterval(timer); window.removeEventListener("experience-stats", update); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  const number = (value: number | undefined) => value === undefined ? "—" : value.toLocaleString("en-US");
  const top = stats?.topSchools[0];
  return <section className={`vx-analytics${minimized ? " vx-analytics-minimized" : ""}`} aria-labelledby="vx-analytics-title">
    <div className="vx-analytics-heading">
      <h2 id="vx-analytics-title">Exhibition live stats</h2>
      <span className={`vx-live-status${offline ? " vx-stale" : ""}`} role="status"><i />{offline ? "Reconnecting…" : stats ? "Live · every 15s" : "Connecting…"}</span>
      <button className="vx-analytics-toggle" type="button" aria-label={minimized ? "Expand visitor statistics" : "Minimize visitor statistics"} aria-expanded={!minimized} aria-controls="vx-analytics-content" onClick={() => setMinimized(!minimized)}>{minimized ? "+" : "−"}</button>
    </div>
    <div id="vx-analytics-content" hidden={minimized}>
      <div className="vx-stat-grid">
        <article className="vx-stat vx-stat-online" title="Visitors active in the last 60 seconds"><span>Online visitors</span><strong>{offline ? "—" : number(stats?.online)}</strong></article>
        <article className="vx-stat" title="Total anonymous browsers counted in this reporting period"><span>Total visitors</span><strong>{number(stats?.visitors)}</strong></article>
        <article className="vx-stat"><span>Booth visits</span><strong>{number(stats?.boothViews)}</strong></article>
        <article className="vx-stat vx-stat-school"><span>Most visited school</span>{top ? <><strong>{top.name}</strong><small>Booth {top.id} · {number(top.views)} {top.views === 1 ? "visit" : "visits"}</small></> : <strong className="vx-no-school">{stats ? "Explore the first booth" : "Waiting for activity…"}</strong>}</article>
      </div>
      <p className="vx-analytics-footnote" title={stats ? `Reporting since ${new Date(stats.startedAt).toLocaleString("en-GB", { timeZone: "Asia/Yangon" })} Myanmar time. Total visitors counts anonymous browsers; repeat booth opens count as visits.` : undefined}>Current server session · resets on restart or after 24 hours.{offline && " Last received totals shown."}</p>
    </div>
  </section>;
}