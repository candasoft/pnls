"use client";

import { useEffect, useRef, useState } from "react";
import { directoryBooths as booths, type DirectoryBooth } from "./directory-data";
import { floorBooths } from "./floor-data";
import { VisualBooth } from "./visual-booth";

const storageKey = "pls2027:experience-favorites";
const filterFields = [
  ["destination", "Study destination"],
  ["program", "Program type"],
  ["subject", "Subject area"],
] as const;

export function ExhibitionDirectory() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("All zones");
  const [filters, setFilters] = useState({ destination: "", program: "", subject: "" });
  const [saved, setSaved] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState("");
  const [selected, setSelected] = useState<DirectoryBooth | null>(null);

  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === "string" && floorBooths.some((booth) => booth.id === id)));
    } catch { setStorageWarning("Favorites will be available for this visit only because browser storage is unavailable."); }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch { setStorageWarning("Favorites will be available for this visit only because browser storage is unavailable."); }
  }, [saved, storageReady]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  function toggleSaved(id: string) {
    setSaved((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }

  function reset() {
    setQuery(""); setZone("All zones"); setFilters({ destination: "", program: "", subject: "" }); setOnlySaved(false);
  }

  const results = booths.filter((booth) =>
    (zone === "All zones" || booth.zone === zone) &&
    (!onlySaved || saved.includes(booth.id)) &&
    filterFields.every(([field]) => !filters[field] || booth[field] === filters[field]) &&
    `${booth.name} ${booth.id} ${booth.zone} ${booth.description} ${booth.programs.join(" ")} ${booth.destination} ${booth.program} ${booth.subject}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const hasFilters = query || zone !== "All zones" || onlySaved || Object.values(filters).some(Boolean);

  return <section className="expo-directory" id="directory" aria-labelledby="directory-heading">
    <div className="container">
      <div className="expo-section-heading"><div><span className="eyebrow">DISCOVER WHAT’S NEXT</span><h2 id="directory-heading">Explore the virtual booths</h2><p>Meet schools, colleges and education providers across six zones.</p></div><button className={`expo-saved ${onlySaved ? "is-active" : ""}`} type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}><span aria-hidden="true">♡</span> My favorites <b>{booths.filter((booth) => saved.includes(booth.id)).length}</b></button></div>
      <div className="expo-preview-note"><span aria-hidden="true">ⓘ</span><p><strong>A first look at the exhibition.</strong> Browse 12 demo institution booths. Names, programs and booth assignments are illustrative; official exhibitor details and media will be added when confirmed.</p><span className="expo-preview-pill">DEMO BOOTHS</span></div>
      <div className="expo-search-panel">
        <label className="expo-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search virtual booths" placeholder="Search schools, booth numbers or courses…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd aria-hidden="true">SEARCH</kbd></label>
        <div className="expo-filter-row">{filterFields.map(([field, label]) => <label key={field}><span>{label}</span><select value={filters[field]} onChange={(event) => setFilters({ ...filters, [field]: event.target.value })}><option value="">All {field === "destination" ? "destinations" : field === "program" ? "program types" : "subjects"}</option>{[...new Set(booths.map((booth) => booth[field]))].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>)}<button className="expo-reset" type="button" onClick={reset} disabled={!hasFilters}>Reset filters ↺</button></div>
      </div>
      <div className="expo-zone-tabs" role="group" aria-label="Filter by education zone">{["All zones", ...new Set(booths.map((booth) => booth.zone))].map((name) => <button key={name} type="button" aria-pressed={zone === name} className={zone === name ? "is-active" : ""} onClick={() => setZone(name)}>{name === "All zones" && <span aria-hidden="true">▦ </span>}{name}</button>)}</div>
      <div className="expo-results-meta"><p role="status">Showing <strong>{results.length}</strong> demo {results.length === 1 ? "booth" : "booths"}{onlySaved ? " in your favorites" : ""}</p><span>Explore now. Plan your next step.</span></div>
      {storageWarning && <p role="status" className="expo-storage-warning">{storageWarning}</p>}
      <div className="expo-booth-grid">{results.map((booth) => <article className={`expo-booth ${booth.cardColor}`} key={booth.id}>
        <div className="expo-booth-art"><img src="/images/fair3.png" alt="" loading="lazy" width={1672} height={941} /><span className="expo-booth-zone">{booth.zone}</span><button className="expo-heart" type="button" aria-label={`${saved.includes(booth.id) ? "Remove" : "Save"} ${booth.name}${saved.includes(booth.id) ? " from" : " to"} favorites`} aria-pressed={saved.includes(booth.id)} onClick={() => toggleSaved(booth.id)}>{saved.includes(booth.id) ? "♥" : "♡"}</button><div className="expo-monogram" aria-hidden="true">{booth.initials}</div></div>
        <div className="expo-booth-body"><div className="expo-booth-kicker">BOOTH {booth.id} <span>•</span> {booth.destination}</div><h3>{booth.name}</h3><p>{booth.description}</p><div className="expo-tags">{booth.programs.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="expo-booth-bottom"><span>Demo institution</span><button type="button" onClick={(event) => { opener.current = event.currentTarget; setSelected(booth); }} aria-label={`Explore ${booth.name} booth`}>Explore booth <span aria-hidden="true">↗</span></button></div></div>
      </article>)}</div>
      {results.length === 0 && <div className="expo-empty"><span aria-hidden="true">⌕</span><h3>{onlySaved && saved.length === 0 ? "Your shortlist starts here." : "No booths match just yet."}</h3><p>{onlySaved && saved.length === 0 ? "Tap the heart on a booth to keep it in your favorites." : "Try another school, booth number or course, or clear your filters."}</p><button className="btn btn-navy" type="button" onClick={reset}>Explore all booths →</button></div>}
      <div className="expo-directory-foot"><span aria-hidden="true">✦</span><p>Find a school you like? Step inside its booth and start exploring.</p><a href="#expo-help">Need a little guidance? ↗</a></div>
      <div className="expo-help" id="expo-help"><h3>Before you explore</h3><details><summary>Are these confirmed exhibitor booths?</summary><p>These 12 dummy institution profiles demonstrate the exhibition. School names, programs and booth assignments are illustrative. They use the same booth identities as the virtual hall so you can explore from either view.</p></details><details><summary>Where are my favorites saved?</summary><p>Your shortlist is stored in this browser and shared with the virtual hall. The favorites count here covers the demo institutions listed in this directory. No account is required. Clearing browser data removes it; favorites do not sync between devices.</p></details><details><summary>Can I chat or book a meeting?</summary><p>Live chat, staff availability and appointment slots will be available when participating institutions and their services are connected. You can email the organizing team now with questions about the exhibition.</p><a href="mailto:meseventservices@gmail.com?subject=Virtual%20exhibition%20question">Email the organizing team ↗</a></details></div>
    </div>
    <dialog ref={dialog} className="vx-dialog vx-visual-dialog" aria-labelledby="vx-booth-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <VisualBooth key={selected.id} booth={selected} favorite={saved.includes(selected.id)} onFavorite={() => toggleSaved(selected.id)} onClose={() => dialog.current?.close()} />}
    </dialog>
  </section>;
}
