"use client";

import { useEffect, useRef, useState } from "react";
import { booths, type Booth } from "./data";

const storageKey = "pls2027:favorite-pathways";
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
  const [selected, setSelected] = useState<Booth | null>(null);
  const [tab, setTab] = useState("Overview");
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === "string" && booths.some((booth) => booth.id === id)));
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
    `${booth.zone} ${booth.title} ${booth.short} ${booth.description} ${booth.tags.join(" ")} ${booth.destination} ${booth.program} ${booth.subject}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const hasFilters = query || zone !== "All zones" || onlySaved || Object.values(filters).some(Boolean);

  return <section className="expo-directory" id="directory" aria-labelledby="directory-heading">
    <div className="container">
      <div className="expo-section-heading"><div><span className="eyebrow">DISCOVER WHAT’S NEXT</span><h2 id="directory-heading">Explore the virtual booths</h2><p>Six zones. So many ways to shape your future.</p></div><button className={`expo-saved ${onlySaved ? "is-active" : ""}`} type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}><span aria-hidden="true">♡</span> My favorites <b>{saved.length}</b></button></div>
      <div className="expo-preview-note"><span aria-hidden="true">ⓘ</span><p><strong>A first look at the exhibition.</strong> These are pathway previews based on the festival’s six zones. Confirmed exhibitors, booth numbers, media and offers will be added as institutions join.</p><span className="expo-preview-pill">PREVIEW</span></div>
      <div className="expo-search-panel">
        <label className="expo-search"><span aria-hidden="true">⌕</span><input ref={search} type="search" aria-label="Search virtual booths" placeholder="Search pathways, courses or interests…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd aria-hidden="true">SEARCH</kbd></label>
        <div className="expo-filter-row">{filterFields.map(([field, label]) => <label key={field}><span>{label}</span><select value={filters[field]} onChange={(event) => setFilters({ ...filters, [field]: event.target.value })}><option value="">All {field === "destination" ? "destinations" : field === "program" ? "program types" : "subjects"}</option>{[...new Set(booths.map((booth) => booth[field]))].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>)}<button className="expo-reset" type="button" onClick={reset} disabled={!hasFilters}>Reset filters ↺</button></div>
      </div>
      <div className="expo-zone-tabs" role="group" aria-label="Filter by education zone">{["All zones", ...booths.map((booth) => booth.zone)].map((name) => <button key={name} type="button" aria-pressed={zone === name} className={zone === name ? "is-active" : ""} onClick={() => setZone(name)}>{name === "All zones" && <span aria-hidden="true">▦ </span>}{name}</button>)}</div>
      <div className="expo-results-meta"><p role="status">Showing <strong>{results.length}</strong> pathway {results.length === 1 ? "preview" : "previews"}{onlySaved ? " in your favorites" : ""}</p><span>Explore now. Plan your next step.</span></div>
      {storageWarning && <p role="status" className="expo-storage-warning">{storageWarning}</p>}
      <div className="expo-booth-grid">{results.map((booth) => <article className={`expo-booth ${booth.color}`} key={booth.id}>
        <div className="expo-booth-art"><img src={booth.image} alt="" loading="lazy" width={600} height={300} /><span className="expo-booth-zone">{booth.zone}</span><button className="expo-heart" type="button" aria-label={`${saved.includes(booth.id) ? "Remove" : "Save"} ${booth.zone}${saved.includes(booth.id) ? " from" : " to"} favorites`} aria-pressed={saved.includes(booth.id)} onClick={() => toggleSaved(booth.id)}>{saved.includes(booth.id) ? "♥" : "♡"}</button><div className="expo-monogram" aria-hidden="true">{booth.mark}</div></div>
        <div className="expo-booth-body"><div className="expo-booth-kicker">PATHWAY PREVIEW <span>•</span> {booth.destination}</div><h3>{booth.title}</h3><p>{booth.description}</p><div className="expo-tags">{booth.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="expo-booth-bottom"><span>Institution profiles coming soon</span><button type="button" onClick={() => { setSelected(booth); setTab("Overview"); }} aria-label={`Explore ${booth.zone} booth`}>Explore booth <span aria-hidden="true">↗</span></button></div></div>
      </article>)}</div>
      {results.length === 0 && <div className="expo-empty"><span aria-hidden="true">⌕</span><h3>{onlySaved && saved.length === 0 ? "Your shortlist starts here." : "No pathways match just yet."}</h3><p>{onlySaved && saved.length === 0 ? "Tap the heart on a booth to keep it in your favorites." : "Try a different keyword or clear your filters to explore all six zones."}</p><button className="btn btn-navy" type="button" onClick={reset}>Explore all pathways →</button></div>}
      <div className="expo-directory-foot"><span aria-hidden="true">✦</span><p>Great decisions start with a little curiosity. Explore more than one pathway.</p><a href="#expo-help">Need a little guidance? ↗</a></div>
      <div className="expo-help" id="expo-help"><h3>Before you explore</h3><details><summary>Are these confirmed exhibitor booths?</summary><p>These six previews introduce the education zones from the festival brief. Participating institution names, addresses, booth numbers, videos, brochures and scholarship offers have not been published yet.</p></details><details><summary>Where are my favorites saved?</summary><p>Your shortlist is stored in this browser on this device. No account is required. Clearing browser data removes it; favorites do not sync between devices.</p></details><details><summary>Can I chat or book a meeting?</summary><p>Live chat, staff availability and appointment slots will be available when participating institutions and their services are connected. You can email the organizing team now with questions about the exhibition.</p><a href="mailto:meseventservices@gmail.com?subject=Virtual%20exhibition%20question">Email the organizing team ↗</a></details></div>
    </div>
    <dialog ref={dialog} className="expo-dialog" aria-labelledby="booth-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <><div className={`expo-dialog-banner ${selected.color}`}><span className="expo-preview-pill">PATHWAY PREVIEW</span><button type="button" className="expo-dialog-close" aria-label="Close booth" onClick={() => dialog.current?.close()}>×</button><div className="expo-monogram" aria-hidden="true">{selected.mark}</div><h2 id="booth-dialog-title">{selected.zone}</h2><p>{selected.short}</p></div><div className="expo-dialog-content"><div className="expo-detail-tabs" role="group" aria-label="Booth sections">{["Overview", "Programs", "Resources", "Connect"].map((name) => <button key={name} type="button" aria-pressed={tab === name} onClick={() => setTab(name)}>{name}</button>)}</div><div className="expo-detail-panel">
        {tab === "Overview" && <><span className="eyebrow">YOUR PATHWAY AT A GLANCE</span><h3>{selected.title}</h3><p>{selected.description}</p><div className="expo-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="expo-detail-notice">Institution profiles, addresses and physical booth locations will appear once exhibitors are confirmed.</p></>}
        {tab === "Programs" && <><h3>Questions worth exploring</h3><p>Use these topics to prepare for a conversation with participating institutions.</p><ul>{selected.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><p className="expo-detail-notice">Courses, fees, scholarships and entry criteria will be published by confirmed exhibitors.</p></>}
        {tab === "Resources" && <><h3>Start with a little preparation.</h3><p>Download a pathway planning checklist to collect your questions before visiting the exhibition.</p><a className="btn btn-navy" download={`${selected.id}-pathway-checklist.txt`} href={`data:text/plain;charset=utf-8,${encodeURIComponent(`PYINYAR LAM SONE 2027\n${selected.zone} — Pathway planning checklist\n\nFestival: 30–31 January 2027, 9 AM–5 PM\nVenue: Myanmar Expo Hall (Fortune Plaza), Yangon\n\nThis is a festival pathway guide, not an institution brochure.\n\nQuestions to explore:\n${selected.topics.map((topic) => `[ ] ${topic}`).join("\n")}\n[ ] Compare full fees, extra costs and payment terms\n[ ] Ask about accreditation and progression opportunities\n[ ] Confirm deadlines and required documents\n\nMy preferred institution:\nMy notes:\nMy next step:\n\nOrganizer: meseventservices@gmail.com\n`)}`}>Download checklist ↓</a><p className="expo-detail-notice">Exhibitor brochures, promotional videos and image galleries are awaiting institution submissions.</p></>}
        {tab === "Connect" && <><h3>Let’s plan your next conversation.</h3><p>For now, contact the organizing team about this pathway. Your email app will open a draft for you to review and send.</p><a className="btn btn-gold" href={`mailto:meseventservices@gmail.com?subject=${encodeURIComponent(`Virtual exhibition enquiry: ${selected.zone}`)}&body=${encodeURIComponent(`Hello Pyinyar Lam Sone team,\n\nI am interested in the ${selected.zone} zone.\n\nMy question or preferred consultation topic:\n\nThank you.`)}`}>Email the organizing team ↗</a><p className="expo-detail-notice">Exhibitor staff availability, direct messaging and confirmed meeting times are not yet available. This email is an enquiry, not a booking.</p></>}
      </div><button className="expo-save-detail" type="button" aria-pressed={saved.includes(selected.id)} onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? "♥ Saved to my favorites" : "♡ Save this pathway"}</button></div></>}
    </dialog>
  </section>;
}
