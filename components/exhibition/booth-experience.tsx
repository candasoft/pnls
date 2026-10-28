"use client";

import { useEffect, useRef, useState } from "react";
import { floorBooths, floorZones, type FloorBooth } from "./floor-data";

type Panel = "about" | "contact" | "video" | "brochure";
const favoriteKey = "pls2027:experience-favorites";

export function BoothExperience() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [selected, setSelected] = useState<FloorBooth | null>(null);
  const [panel, setPanel] = useState<Panel>("about");
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
              <div className="vx-stage">MAIN STAGE<span>Education &amp; career talks</span></div><div className="vx-seating">SEATING AREA<span aria-hidden="true">▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤ &nbsp; ▤</span></div>
              <div className="vx-zone-label vx-ab-label">ACADEMIC &amp; HIGHER EDUCATION</div><div className="vx-zone-label vx-skill-label">SKILL ZONE</div><div className="vx-zone-label vx-language-label">LANGUAGE ZONE</div><div className="vx-zone-label vx-overseas-label">OVERSEAS</div>
              {floorBooths.map((booth) => <button key={booth.id} type="button" className={`vx-booth ${booth.color}${filtering && !matches(booth) ? " vx-dimmed" : ""}${favorites.includes(booth.id) ? " vx-is-favorite" : ""}`} style={{ left: booth.x, top: booth.y, width: booth.width ?? 96, height: booth.height ?? 43 }} title={`${booth.name} · ${booth.id} · ${booth.zone}`} aria-label={`${booth.name}, booth ${booth.id}, ${booth.zone}${favorites.includes(booth.id) ? ", saved to favorites" : ""}`} onClick={(event) => { opener.current = event.currentTarget; setSelected(booth); setPanel("about"); }}>{booth.name}</button>)}
              <div className="vx-food">FOOD COURT<span>Take a little break</span></div><div className="vx-entry">↑ ENTRANCE</div><div className="vx-exit">EXIT ↓</div><div className="vx-aisle">EXPLORE AT YOUR OWN PACE</div>
            </div>
          </div>
        </div>
        <div className="vx-map-bottom"><span>↔ Scroll to explore · Use + / − to zoom</span><span>Layout reference · Not to scale</span></div>
      </section>
    </div>
    <div className="vx-bottom-invitation"><span aria-hidden="true">✦</span><p>Your next chapter could start with one conversation.</p><a href="mailto:meseventservices@gmail.com?subject=Virtual%20experience%20enquiry">Contact the organizers ↗</a></div>
    <dialog className="vx-dialog" ref={dialog} aria-labelledby="vx-booth-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <>
        <div className={`vx-dialog-cover ${selected.color}`}><img src={selected.image} alt="Festival concept artwork" width={900} height={300} /><button className="vx-close" type="button" aria-label="Close booth details" onClick={() => dialog.current?.close()}>×</button><span className="vx-cover-label">{selected.zone} <span>·</span> Booth {selected.id}</span></div>
        <div className="vx-dialog-body"><div className="vx-school-heading"><div className={`vx-school-mark ${selected.color}`} aria-hidden="true">{selected.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}</div><div><span className="vx-demo-label">DEMO SCHOOL PROFILE</span><h2 id="vx-booth-title">{selected.name}</h2><p>{selected.zone} · Pyinyar Lam Sone 2027</p></div></div>
          <div className="vx-actions"><button type="button" aria-pressed={favorites.includes(selected.id)} onClick={() => toggleFavorite(selected.id)}>{favorites.includes(selected.id) ? "♥ Favorited" : "♡ Favorite"}</button><button type="button" aria-pressed={panel === "contact"} onClick={() => setPanel("contact")}>↗ Contact</button><button type="button" aria-pressed={panel === "video"} onClick={() => setPanel("video")}>▷ Watch video</button><button type="button" aria-pressed={panel === "brochure"} onClick={() => setPanel("brochure")}>↓ Download brochure</button></div>
          <div className="vx-popup-tabs" role="group" aria-label="Booth information"><button type="button" aria-pressed={panel === "about"} onClick={() => setPanel("about")}>About the school</button><button type="button" aria-pressed={panel === "contact"} onClick={() => setPanel("contact")}>Contact &amp; enquiries</button><button type="button" aria-pressed={panel === "video" || panel === "brochure"} onClick={() => setPanel("video")}>Videos &amp; brochures</button></div>
          <div className="vx-popup-panel" aria-live="polite">
            {panel === "about" && <><h3>A new direction starts here.</h3><p>{selected.description}</p><h4>Explore programs &amp; opportunities</h4><div className="vx-program-tags">{selected.programs.map((program) => <span key={program}>{program}</span>)}</div><div className="vx-profile-facts"><div><small>Booth location</small><strong>{selected.id} · {selected.zone}</strong></div><div><small>School address</small><strong>{selected.address || "To be provided by the school"}</strong></div><div><small>Festival dates</small><strong>30–31 January 2027</strong></div><div><small>Staff availability</small><strong>Not yet published</strong></div></div><p className="vx-small-note">This profile demonstrates the booth experience. School identity, programs and booth allocation are illustrative.</p></>}
            {panel === "contact" && <><h3>Start a conversation</h3><p>Ask about programs, admission requirements, scholarships or a consultation. Direct school contacts and meeting slots will appear when confirmed.</p>{selected.email && <a className="vx-contact-link" href={`mailto:${selected.email}`}>{selected.email} ↗</a>}{selected.phone && <a className="vx-contact-link" href={`tel:${selected.phone}`}>{selected.phone} ↗</a>}{selected.website && <a className="vx-contact-link" href={selected.website} target="_blank" rel="noopener noreferrer">Visit school website ↗</a>}<form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const body = `Hello Pyinyar Lam Sone team,\n\nI am enquiring about demo booth ${selected.id} (${selected.name}).\n\n${String(form.get("message"))}\n\nName: ${String(form.get("name"))}`; window.location.href = `mailto:${selected.email || "meseventservices@gmail.com"}?subject=${encodeURIComponent(`Virtual booth enquiry: ${selected.id}`)}&body=${encodeURIComponent(body)}`; }}><label>Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="How should we address you?" /></label><label>Your question<textarea name="message" required maxLength={2000} rows={3} placeholder="I’d like to learn more about…" /></label><button className="btn btn-gold" type="submit">Prepare email enquiry ↗</button></form><p className="vx-small-note">Opens a draft in your email app for you to send to {selected.email ? "the school" : "the organizing team"}. This does not confirm an appointment.</p></>}
            {panel === "video" && <><h3>Meet the school</h3>{selected.videoUrl ? <video controls preload="none" src={selected.videoUrl} aria-label={`${selected.name} introduction`} /> : <div className="vx-media-placeholder"><span aria-hidden="true">▷</span><strong>School video coming soon</strong><p>The school’s introduction will play here once its video is provided.</p></div>}<button type="button" className="vx-contact-link" onClick={() => setPanel("brochure")}>Explore the brochure ↓</button></>}
            {panel === "brochure" && <><h3>Take the details with you</h3><p>School brochures will include programs, entry requirements and contact information.</p>{selected.brochureUrl ? <a className="btn btn-navy" href={selected.brochureUrl} target="_blank" rel="noopener noreferrer" download>Download school brochure ↓</a> : <><div className="vx-resource-card"><span aria-hidden="true">▤</span><div><strong>{selected.name}</strong><p>Official brochure awaiting school submission</p></div></div><a className="btn btn-navy" download={`${selected.id}-preview-guide.txt`} href={`data:text/plain;charset=utf-8,${encodeURIComponent(`PYINYAR LAM SONE 2027 — DEMO BOOTH GUIDE\n\n${selected.name}\nBooth: ${selected.id}\nZone: ${selected.zone}\n\nThis is a sample planning guide, not an official school brochure.\n\n${selected.description}\n\nExplore: ${selected.programs.join(", ")}\n\nQuestions to ask:\n- What are the admission requirements?\n- What are the full fees and available scholarships?\n- What qualifications and progression routes are offered?\n- When are the application deadlines?\n\n30–31 January 2027, Myanmar Expo Hall (Fortune Plaza), Yangon\nOrganizer: meseventservices@gmail.com\n`)}`}>Download preview guide ↓</a><p className="vx-small-note">The preview guide is available now. The official brochure download will replace it when supplied.</p></>}</>}
          </div>
        </div>
      </>}
    </dialog>
  </div>;
}
