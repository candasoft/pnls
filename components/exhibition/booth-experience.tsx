"use client";

import { useEffect, useRef, useState } from "react";
import { floorBooths, floorZones, type FloorBooth } from "./floor-data";
import { VisualBooth } from "./visual-booth";
import { MainStage } from "./main-stage";
import { ExperienceAnalytics, trackExperience } from "./experience-analytics";


const favoriteKey = "pls2027:experience-favorites";

export function BoothExperience() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [selected, setSelected] = useState<FloorBooth | null>(null);

  const [zoom, setZoom] = useState(100);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
      if (Array.isArray(parsed)) setFavorites(parsed.filter((id): id is string => typeof id === "string" && floorBooths.some((booth) => booth.id === id)));
    } catch { setStorageMessage("Favorites are saved for this visit only; browser storage is unavailable."); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(favoriteKey, JSON.stringify(favorites)); }
    catch { setStorageMessage("Favorites are saved for this visit only; browser storage is unavailable."); }
  }, [favorites, ready]);

  useEffect(() => {
    if (!selected) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; };
  }, [selected]);

  function toggleFavorite(id: string) {
    setFavorites((previous) => previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id]);
  }

  function reset() { setQuery(""); setZone("all"); setFavoritesOnly(false); }

  function matches(booth: FloorBooth) {
    return (zone === "all" || booth.color === zone) &&
      (!favoritesOnly || favorites.includes(booth.id)) &&
      `${booth.name} ${booth.id} ${booth.zone} ${booth.programs.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase());
  }
  const count = floorBooths.filter(matches).length;
  const filtering = query.trim() !== "" || zone !== "all" || favoritesOnly;

  return <div className="container vx-experience">
    <div className="vx-notice"><span aria-hidden="true">ⓘ</span><p><strong>Interactive preview.</strong> The arrangement follows the supplied booth plan. School names and profiles are demo content; final assignments, contact details, videos and brochures are awaiting exhibitors.</p><span className="vx-chip">DEMO</span></div>
    <ExperienceAnalytics />
    <div className="vx-toolbar">
      <label className="vx-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Find a school or booth" placeholder="Find a school, booth number or course…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label className="vx-zone-select"><span className="vx-sr-only">Education zone</span><select value={zone} onChange={(event) => setZone(event.target.value)}><option value="all">All zones &amp; partners</option>{floorZones.map((item) => <option key={item.code} value={item.color}>{item.name}</option>)}<option value="partner">VIP &amp; zone partners</option></select></label>
      <button className="vx-favorites" type="button" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(!favoritesOnly)}>♡ My favorites <b>{favorites.length}</b></button>
    </div>
    <div className="vx-workspace">
      <aside className="vx-sidebar" aria-label="Floor plan guide">
        <span className="eyebrow">FIND YOUR WAY</span><h2>The exhibition hall</h2><p>Select a school on the plan to step inside its virtual booth.</p>
        <div className="vx-legend"><button type="button" className={zone === "all" ? "selected" : ""} onClick={() => setZone("all")} aria-pressed={zone === "all"}><span className="vx-dot all" />All zones</button>{floorZones.map((item) => <button key={item.code} className={zone === item.color ? "selected" : ""} type="button" aria-pressed={zone === item.color} onClick={() => setZone(zone === item.color ? "all" : item.color)}><span className={`vx-dot ${item.color}`} />{item.name}<small>{item.code}</small></button>)}<button type="button" aria-pressed={zone === "partner"} className={zone === "partner" ? "selected" : ""} onClick={() => setZone(zone === "partner" ? "all" : "partner")}><span className="vx-dot partner" />VIP &amp; zone partners</button></div>
        <div className="vx-side-note"><span aria-hidden="true">↖</span><h3>A booth is just a click away.</h3><p>Explore programs, save schools, view media and find ways to connect.</p></div><a className="vx-directory-link" href="/virtual-exhibition">Prefer browsing the directory? ↗</a>
      </aside>
      <section className="vx-map-panel" aria-label="Interactive booth layout plan">
        <div className="vx-map-top"><div><strong>Booth layout plan</strong><p role="status">{filtering ? `${count} matching ${count === 1 ? "booth" : "booths"}` : `${floorBooths.length} demo booths · Select a school to explore`}</p></div><div className="vx-zoom"><button type="button" aria-label="Zoom out" disabled={zoom === 70} onClick={() => setZoom(Math.max(70, zoom - 10))}>−</button><button type="button" aria-label="Reset map zoom" onClick={() => setZoom(100)}>{zoom}%</button><button type="button" aria-label="Zoom in" disabled={zoom === 130} onClick={() => setZoom(Math.min(130, zoom + 10))}>+</button></div></div>
        {storageMessage && <p className="vx-storage-message" role="status">{storageMessage}</p>}
        {filtering && <div className="vx-match-note"><span>{count === 0 ? "No schools match. Try another search or reset your filters." : "Matching booths are highlighted. Other booths stay visible to help you navigate."}</span><button type="button" onClick={reset}>Reset filters ↺</button></div>}
        <div className="vx-map-scroll" tabIndex={0} aria-label="Scrollable floor plan. Scroll horizontally and vertically to explore all booths.">
          <div className="vx-floor" style={{ width: `${zoom * 9}px`, height: `${zoom * 14.22}px` }}>
            <div className="vx-floor-inner" style={{ transform: `scale(${zoom * 0.009})` }}>
              <MainStage /><div className="vx-seating">SEATING AREA<span aria-hidden="true">▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤</span></div>
              <div className="vx-zone-label vx-ab-label">ACADEMIC &amp; HIGHER EDUCATION</div><div className="vx-zone-label vx-skill-label">SKILL ZONE</div><div className="vx-zone-label vx-language-label">LANGUAGE ZONE</div><div className="vx-zone-label vx-overseas-label">OVERSEAS</div>
              {floorBooths.map((booth) => <button key={booth.id} type="button" className={`vx-booth ${booth.color}${booth.logo ? " vx-branded-booth" : ""}${filtering && !matches(booth) ? " vx-dimmed" : ""}${favorites.includes(booth.id) ? " vx-is-favorite" : ""}`} style={{ left: booth.x, top: booth.y, width: booth.width ?? 96, height: booth.height ?? 43 }} title={`${booth.name} · ${booth.id} · ${booth.zone}`} aria-label={`${booth.name}, booth ${booth.id}, ${booth.zone}${favorites.includes(booth.id) ? ", saved to favorites" : ""}`} onClick={(event) => { opener.current = event.currentTarget; trackExperience({ type: "booth", boothId: booth.id }); setSelected(booth); }}>{booth.logo && <img src={booth.logo} alt="" width={132} height={91} />}<span>{booth.name}</span></button>)}
              <div className="vx-food">FOOD COURT<span>Take a little break</span></div><div className="vx-entry">↑ ENTRANCE</div><div className="vx-exit">EXIT ↓</div><div className="vx-aisle">EXPLORE AT YOUR OWN PACE</div>
            </div>
          </div>
        </div>
        <div className="vx-map-bottom"><span>↔ Scroll to explore · Use + / − to zoom</span><span>Layout reference · Not to scale</span></div>
      </section>
    </div>
    <div className="vx-bottom-invitation"><span aria-hidden="true">✦</span><p>Your next chapter could start with one conversation.</p><a href="mailto:meseventservices@gmail.com?subject=Virtual%20experience%20enquiry">Contact the organizers ↗</a></div>
    <dialog className="vx-dialog vx-visual-dialog" ref={dialog} aria-labelledby="vx-booth-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <VisualBooth key={selected.id} booth={selected} favorite={favorites.includes(selected.id)} onFavorite={() => toggleFavorite(selected.id)} onClose={() => dialog.current?.close()} />}
    </dialog>
  </div>;
}
