"use client";

import { useState } from "react";
import hallRender from "@/pics/3dlayout.png";
import { referenceBounds } from "./reference-layout";
import { spaces, zones, type Space } from "./layout-data";

export function FloorPlan() {
  const [view, setView] = useState<"3d" | "2d">("3d");
  const angle = -25;
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Space | null>(null);
  const [query, setQuery] = useState("");
  const radians = (view === "2d" ? 0 : angle) * Math.PI / 180;
  const tilt = view === "2d" ? 1 : .48;
  function raw(x: number, y: number, z = 0) {
    return [(x - 315) * Math.cos(radians) - (y - 855) * Math.sin(radians), ((x - 315) * Math.sin(radians) + (y - 855) * Math.cos(radians)) * tilt - (view === "2d" ? 0 : z)];
  }
  const corners = [[-20, -35], [650, -35], [650, 1750], [-20, 1750]].map(([x, y]) => raw(x, y));
  const xs = corners.map((p) => p[0]); const ys = corners.map((p) => p[1]);
  const scale = Math.min(940 / (Math.max(...xs) - Math.min(...xs)), 735 / (Math.max(...ys) - Math.min(...ys)));
  function project(x: number, y: number, z = 0) { const p = raw(x, y, z); return [500 + p[0] * scale, 410 + p[1] * scale]; }
  function polygon(points: number[][]) { return points.map((p) => project(p[0], p[1], p[2] ?? 0).join(",")).join(" "); }
  const term = query.trim().toLowerCase().replace(/\s+/g, "-");
  const matches = (space: Space) => (filter === "All" || filter === space.zone) && (!term || `${space.id} ${space.label} ${zones.find((z) => z.code === space.zone)?.name ?? space.zone}`.toLowerCase().includes(term));
  const results = spaces.filter(matches);
  const zone = zones.find((z) => z.code === selected?.zone);
  const ordered = [...spaces].sort((a, b) => raw(a.x + a.w / 2, a.y + a.d / 2)[1] - raw(b.x + b.w / 2, b.y + b.d / 2)[1]);
  function reset() { setView("3d"); setZoom(1); setFilter("All"); setQuery(""); setSelected(null); }

  return <section className="container fp-explorer" aria-labelledby="fp-explore-title">
    <div className="fp-explore-heading"><div><span className="eyebrow">THE FESTIVAL, AT A GLANCE</span><h2 id="fp-explore-title">One hall. A world of possibilities.</h2></div><a className="fp-download" href="/images/floor-layout.jpg" download="Pyinyar-Lam-Sone-Floor-Plan.jpg">↓ <span>Download original plan</span></a></div>
    <div className="fp-workspace">
      <aside className="fp-sidebar" aria-label="Floor plan controls">
        <label className="fp-search-label" htmlFor="fp-search">Find a booth or area</label>
        <div className="fp-search"><span aria-hidden="true">⌕</span><input id="fp-search" placeholder="Try A-01, stage, language…" value={query} onChange={(e) => { setQuery(e.target.value); setSelected(null); }} />{query && <button aria-label="Clear search" onClick={() => setQuery("")}>×</button>}</div>
        <div className="fp-legend-heading"><h3>Explore the zones</h3><span>BOOTH PREFIX</span></div>
        <div className="fp-zone-list"><button className={filter === "All" ? "is-active" : ""} aria-pressed={filter === "All"} onClick={() => { setFilter("All"); setSelected(null); }}><i className="fp-all-dot" /><span>Entire festival</span><b>All</b></button>{zones.map((z) => <button key={z.code} className={filter === z.code ? "is-active" : ""} aria-pressed={filter === z.code} onClick={() => { setFilter(z.code); setQuery(""); setSelected(null); }}><i style={{ background: z.color }} /><span>{z.name}</span><b>{z.code}</b></button>)}{[{ name: "VIP areas", code: "VIP", color: "#eea136" }, { name: "Partners", code: "Partners", color: "#efb757" }, { name: "Visitor facilities", code: "Facilities", color: "#94a2b5" }].map((z) => <button key={z.code} className={filter === z.code ? "is-active" : ""} aria-pressed={filter === z.code} onClick={() => { setFilter(z.code); setQuery(""); setSelected(null); }}><i style={{ background: z.color }} /><span>{z.name}</span><b>↗</b></button>)}</div>
        <div className="fp-detail" aria-live="polite">{selected ? <><span className="fp-detail-kicker">SELECTED LOCATION</span><h3><i style={{ background: selected.color }} />{selected.label}</h3><p>{zone ? `${zone.name} zone · Booth ${selected.id}` : view === "3d" && selected.zone === "VIP" ? "VIP area shown in the supplied hall concept. Confirm dimensions and availability with the organizing team." : selected.detail ?? `${selected.label.replace("PARTNER", "Partnership zone")} — see the original plan for the full footprint.`}</p>{zone && <dl><div><dt>Booth size</dt><dd>{zone.size}</dd></div><div><dt>Reference rate</dt><dd>{zone.rate} Lakhs</dd></div></dl>}<button onClick={() => setSelected(null)}>Clear selection ×</button></> : <><span className="fp-detail-kicker">MAKE YOURSELF AT HOME</span><h3>Select a space</h3><p>Choose any booth or landmark on the map to see its details. Use the zones above to highlight your interests.</p></>}</div>
      </aside>
      <div className={`fp-map-panel${view === "3d" ? " fp-render-panel" : ""}`}>
        <div className="fp-map-toolbar"><div className="fp-view-switch" aria-label="Map view"><button aria-pressed={view === "3d"} onClick={() => setView("3d")}>◇ &nbsp;3D view</button><button aria-pressed={view === "2d"} onClick={() => setView("2d")}>▦ &nbsp;Top view</button></div><button className="fp-reset" onClick={reset}>↺ <span>Reset view</span></button></div>
        <div className="fp-map-caption"><span><i /> {view === "3d" ? "3D HALL OVERVIEW" : "TOP-DOWN HALL OVERVIEW"}</span><span>MYANMAR EXPO HALL</span></div>
        <div className="fp-map-scroll" tabIndex={0} role="region" aria-label="Interactive floor map. Select booths with Tab and Enter. When zoomed, scroll to explore.">
          {view === "3d" && <svg className="fp-map fp-render-map" viewBox={`0 0 ${hallRender.width} ${hallRender.height}`} style={{ width: `${zoom * 100}%` }} aria-label="Interactive 3D festival hall layout">
            <title>Pyinyar Lam Sone 3D exhibition hall</title>
            <desc>Detailed hall concept with premium booths along the top, education zones through the centre, service booths along the bottom, entrance and exit on the left, and stage on the right. Select a booth to see its details.</desc>
            <image href={hallRender.src} width={hallRender.width} height={hallRender.height} />
            {spaces.map((space) => {
              const bounds = referenceBounds(space);
              if (!bounds) return null;
              const [x, y, width, height] = bounds;
              const active = selected?.id === space.id;
              const dim = !matches(space) || (selected !== null && !active);
              const highlighted = !dim && (filter !== "All" || !!term);
              return <g key={space.id} className={`fp-render-space${active ? " is-selected" : ""}`} role="button" tabIndex={dim ? -1 : 0} aria-label={`${space.label}, ${zones.find(z => z.code === space.zone)?.name ?? space.zone}`} aria-pressed={active} onClick={() => setSelected(space)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(space); } }}>
                <title>{space.label}</title>
                <rect x={x} y={y} width={width} height={height} rx="4" fill={dim ? "#f5f6f8" : space.color} fillOpacity={dim ? .78 : active ? .22 : highlighted ? .12 : 0} stroke={active ? "#071638" : highlighted ? "#ffffff" : "transparent"} strokeWidth={active ? 5 : 2} />
              </g>;
            })}
          </svg>}
          <svg className="fp-map fp-schematic" viewBox="0 0 1000 850" style={{ width: `${zoom * 100}%`, display: view === "3d" ? "none" : undefined }} aria-label="Festival floor plan based on the supplied hall layout">
            <title>Pyinyar Lam Sone festival hall</title><desc>Stage and VIP areas at the back, education booths down the centre, premium booths on the left, service booths on the right, and lobby at the front.</desc>
            <defs><pattern id="fp-grid" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#d7ddd9" /></pattern><filter id="fp-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1d3248" floodOpacity=".16" /></filter></defs>
            <rect width="1000" height="850" fill="url(#fp-grid)" />
            <polygon points={polygon([[-12, -12, -12], [642, -12, -12], [642, 1722, -12], [-12, 1722, -12]])} fill="#bbc5c5" filter="url(#fp-shadow)" />
            <polygon points={polygon([[-12, -12], [642, -12], [642, 1722], [-12, 1722]])} fill="#faf9f3" stroke="#c8cfc9" strokeWidth="2" />
            <polygon points={polygon([[0, 1534], [630, 1534], [630, 1710], [0, 1710]])} fill="#eeeae1" />
            {[0, 630].map((x) => <polyline key={x} points={polygon([[x, 1530], [x, 0], [x === 0 ? 270 : 400, 0]])} fill="none" stroke="#d0d5d0" strokeWidth={view === "3d" ? 8 : 3} />)}
            {ordered.map((s) => {
              const active = selected?.id === s.id;
              const dim = !matches(s) || (selected !== null && !active);
              const p = project(s.x + s.w / 2, s.y + s.d / 2, s.h + 1);
              return <g key={s.id} className={`fp-space${active ? " is-selected" : ""}`} role="button" tabIndex={dim ? -1 : 0} aria-label={`${s.label}, ${zones.find((z) => z.code === s.zone)?.name ?? s.zone}`} aria-pressed={active} onClick={() => setSelected(s)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(s); } }} opacity={dim ? .16 : 1}>
                <title>{`${s.label} · ${zones.find((z) => z.code === s.zone)?.name ?? s.zone}`}</title>
                {view === "3d" && <><polygon points={polygon([[s.x, s.y + s.d], [s.x + s.w, s.y + s.d], [s.x + s.w, s.y + s.d, s.h], [s.x, s.y + s.d, s.h]])} fill={s.color} /><polygon points={polygon([[s.x + s.w, s.y], [s.x + s.w, s.y + s.d], [s.x + s.w, s.y + s.d, s.h], [s.x + s.w, s.y, s.h]])} fill={s.color} /><polygon points={polygon([[s.x, s.y + s.d], [s.x + s.w, s.y + s.d], [s.x + s.w, s.y + s.d, s.h], [s.x, s.y + s.d, s.h]])} fill="#071638" opacity=".24" /></>}
                <polygon className="fp-space-top" points={polygon([[s.x, s.y, s.h], [s.x + s.w, s.y, s.h], [s.x + s.w, s.y + s.d, s.h], [s.x, s.y + s.d, s.h]])} fill={s.color} stroke={active ? "#071638" : "#ffffff"} strokeWidth={active ? 3 : .7} />
                <text x={p[0]} y={p[1]} textAnchor="middle" dominantBaseline="central" fill={["C", "Partners", "VIP", "Facilities"].includes(s.zone) && s.id !== "STAGE" ? "#243447" : "#fff"} fontSize={s.label.length > 8 ? 6.5 : 8} fontWeight="700" pointerEvents="none">{s.label.replace(/^([A-Z])-(\d+)$/, "$1$2")}</text>
              </g>;
            })}
            {[[186, "↑ ENTRANCE", "#2b8657"], [420, "EXIT ↓", "#b14949"]].map(([x, label, color]) => { const p = project(Number(x), 1590, 0); return <text key={label} x={p[0]} y={p[1]} fill={String(color)} fontSize="9" fontWeight="800" textAnchor="middle">{label}</text>; })}
          </svg>
        </div>
        <div className="fp-map-bottom"><span>Click a booth to explore <span aria-hidden="true">↗</span></span><div className="fp-camera"><button aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((z) => Math.max(1, z - .25))}>−</button><span>{Math.round(zoom * 100)}%</span><button aria-label="Zoom in" disabled={zoom >= 2.5} onClick={() => setZoom((z) => Math.min(2.5, z + .25))}>+</button></div></div>
      </div>
    </div>
    {(query || filter !== "All") && <div className="fp-results"><p role="status"><strong>{results.length}</strong> matching locations{results.length === 0 ? ". Try a booth code such as A-01, or clear your filters." : " · Select a location to see details."}</p><div>{results.map((s) => <button key={s.id} aria-pressed={selected?.id === s.id} onClick={() => { setSelected(s); if (view === "3d" && !referenceBounds(s)) setView("2d"); }}><i style={{ background: s.color }} />{s.label}</button>)}</div></div>}
    <div className="fp-plan-note"><span aria-hidden="true">ⓘ</span><p>Based on the supplied festival floor layout. The 3D view uses the supplied hall concept render; the top view follows the original schematic. These references differ in orientation and some facilities. Additional lobby facilities are available in Top view. Booth rates are from the reference plan; confirm availability and pricing with the organizing team.</p><a href="/images/floor-layout.jpg" target="_blank" rel="noopener noreferrer">View original ↗</a></div>
  </section>;
}
