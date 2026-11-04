"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { FloorBooth } from "./floor-data";

type Props = {
  booth: FloorBooth;
  favorite: boolean;
  onFavorite: () => void;
  onClose: () => void;
};

function guideUrl(booth: FloorBooth, admissions = false) {
  return `/api/virtual-booths/${encodeURIComponent(booth.id)}/guide${admissions ? "?type=admissions" : ""}`;
}

export function VisualBooth({ booth, favorite, onFavorite, onClose }: Props) {
  const [panel, setPanel] = useState<"about" | "contact" | null>(null);
  const [videoNotice, setVideoNotice] = useState(false);
  const [downloaded, setDownloaded] = useState("");
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const panelOpener = useRef<HTMLButtonElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (panel) panelHeading.current?.focus();
  }, [panel]);

  function openPanel(next: "about" | "contact", event: MouseEvent<HTMLButtonElement>) {
    if (!panel) panelOpener.current = event.currentTarget;
    setPanel(next);
  }

  function closePanel() {
    setPanel(null);
    panelOpener.current?.focus();
  }

  return <div className="vb-experience">
    <div className="vb-topbar">
      <div className="vb-location"><span className="vb-location-icon" aria-hidden="true">▦</span><div><strong>{booth.name}</strong><span>{booth.zone} <i>·</i> Booth {booth.id}</span></div></div>
      <div className="vb-top-actions"><span className="vb-demo">DEMO BOOTH</span><button className="vb-favorite" type="button" aria-label={favorite ? "Remove school from favorites" : "Save school to favorites"} aria-pressed={favorite} onClick={onFavorite}><span aria-hidden="true">{favorite ? "♥" : "♡"}</span><span>{favorite ? "Saved" : "Favorite"}</span></button><button className="vb-close" type="button" aria-label="Close booth details" onClick={onClose}>×</button></div>
    </div>

    <div className="vb-scene-scroll" tabIndex={0} aria-label="Visual booth scene. On small screens, scroll sideways to explore the desk, wall screen and adviser.">
      <div className="vb-scene">
        <img className="vb-backdrop" src="/images/virtual-booth-interior.webp" alt="Navy and gold exhibition booth with a wall screen, reception desk and education adviser" width={1536} height={1024} />
        <div className="vb-canopy"><span>EDUCATION &amp; CAREER PATHWAYS</span><h2 id="vx-booth-title">{booth.name}</h2></div>

        <div className="vb-wall-screen" aria-label="School introduction on the booth wall">
          {booth.videoUrl && !videoError ? <video controls playsInline preload="none" poster={booth.image} src={booth.videoUrl} aria-label={`${booth.name} introduction video`} onError={() => setVideoError(true)} /> : <>
            <img src={booth.image} alt="" width={600} height={340} />
            <div className="vb-screen-shade" />
            {videoNotice || videoError ? <div className="vb-screen-notice" role="status"><span aria-hidden="true">▷</span><strong>{videoError ? "Video is unavailable" : "Meet your future school"}</strong><p>{videoError ? "Please try again later or contact the organizing team." : "The school’s introduction will play on this wall once its video is provided."}</p><button type="button" onClick={() => { setVideoNotice(false); setVideoError(false); }}>Back to screen</button></div> : <button type="button" className="vb-play" aria-label="Watch school introduction on wall screen" onClick={() => setVideoNotice(true)}><span className="vb-play-circle" aria-hidden="true">▶</span><strong>Discover {booth.name}</strong><small>Watch our introduction</small></button>}
          </>}
          <div className="vb-screen-caption">SCHOOL INTRODUCTION <span aria-hidden="true">●</span></div>
        </div>

        <button type="button" className="vb-speech" aria-expanded={panel === "contact"} aria-controls="vb-information" onClick={(event) => openPanel("contact", event)}><span className="vb-speech-hello">Hello, future explorer!</span><strong>Let’s talk about<br />your next step.</strong><span className="vb-speech-link">Contact our team <span aria-hidden="true">↗</span></span></button>

        <button className="vb-profile-sign" type="button" aria-expanded={panel === "about"} aria-controls="vb-information" onClick={(event) => openPanel("about", event)}><span className="vb-sign-mark" aria-hidden="true">{booth.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}</span><span>YOUR FUTURE<br />STARTS HERE.</span><small>About the school <span aria-hidden="true">↗</span></small></button>

        <a className="vb-document vb-document-main" href={booth.brochureUrl || guideUrl(booth)} download={booth.brochureUrl ? undefined : `${booth.id}-school-preview.txt`} target={booth.brochureUrl ? "_blank" : undefined} rel={booth.brochureUrl ? "noopener noreferrer" : undefined} aria-label={booth.brochureUrl ? "Download school brochure from the desk" : "Download sample school guide from the desk"} onClick={() => setDownloaded(booth.brochureUrl ? "Your school brochure is opening." : "Preview guide downloaded. Official school brochure awaiting submission.")}>
          <span className="vb-document-cover"><span className="vb-paper-emblem" aria-hidden="true">✦</span><strong>{booth.name}</strong><span className="vb-paper-rule" /><small>{booth.brochureUrl ? "SCHOOL BROCHURE" : "SCHOOL PREVIEW"}</small><span className="vb-paper-landscape" aria-hidden="true" /><span className="vb-paper-footer">EXPLORE YOUR POSSIBILITIES</span></span><span className="vb-document-label">{booth.brochureUrl ? "School brochure" : "Preview brochure"} <b aria-hidden="true">↓</b></span>
        </a>
        <a className="vb-document vb-document-admissions" href={guideUrl(booth, true)} download={`${booth.id}-admissions-checklist.txt`} aria-label="Download admissions checklist from the desk" onClick={() => setDownloaded("Admissions planning checklist downloaded.")}><span className="vb-document-cover"><span className="vb-paper-emblem" aria-hidden="true">▤</span><strong>Your next<br />chapter.</strong><span className="vb-paper-rule" /><small>ADMISSIONS CHECKLIST</small><span className="vb-paper-lines" aria-hidden="true">—<br />—<br />—</span><span className="vb-paper-footer">PREPARE. EXPLORE. CONNECT.</span></span><span className="vb-document-label">Admissions guide <b aria-hidden="true">↓</b></span></a>

        <div className="vb-desk-brand"><span aria-hidden="true">✦</span><strong>{booth.name}</strong><small>{booth.zone}</small></div>
        <div className="vb-scene-hint"><span aria-hidden="true">✦</span> This booth is yours to explore.</div>
      </div>
    </div>

    <div className="vb-footer"><span><span className="vb-footer-dot" aria-hidden="true" /> Click the screen, desk documents or adviser’s speech bubble.</span><span>Illustrative booth · {booth.brochureUrl ? "School brochure available" : "Sample downloads"}</span></div>
    <div className="vb-download-status" role="status">{downloaded}</div>

    {panel && <section className="vb-information" id="vb-information" aria-labelledby="vb-panel-title">
      <div className="vb-info-header"><div><span>{panel === "contact" ? "LET’S CONNECT" : "GET TO KNOW US"}</span><h3 id="vb-panel-title" ref={panelHeading} tabIndex={-1}>{panel === "contact" ? "Your next step starts with a conversation." : booth.name}</h3></div><button type="button" aria-label="Return to visual booth" onClick={closePanel}>×</button></div>
      {panel === "about" ? <div className="vb-about"><p>{booth.description}</p><div className="vb-programs">{booth.programs.map((program) => <span key={program}>{program}</span>)}</div><dl><div><dt>Find us at</dt><dd>{booth.id} · {booth.zone}</dd></div><div><dt>Festival dates</dt><dd>30–31 January 2027</dd></div><div><dt>School address</dt><dd>{booth.address || "Awaiting school submission"}</dd></div><div><dt>Staff availability</dt><dd>Not yet published</dd></div></dl><p className="vb-info-note">This is a demonstration school profile. Official details will be added as exhibitors are confirmed.</p><button type="button" className="btn btn-gold" onClick={(event) => openPanel("contact", event)}>Ask us a question ↗</button></div> : <div className="vb-contact"><p>Tell us what you’d like to explore. {booth.email ? "Your enquiry will be addressed to the school." : "While school contacts are being confirmed, enquiries go to the organizing team."}</p><div className="vb-contact-links">{booth.email && <a href={`mailto:${booth.email}`}>{booth.email} ↗</a>}{booth.phone && <a href={`tel:${booth.phone}`}>{booth.phone} ↗</a>}{booth.website && <a href={booth.website} target="_blank" rel="noopener noreferrer">Visit school website ↗</a>}</div><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const body = `Hello,\n\nI am enquiring about demo booth ${booth.id} (${booth.name}).\n\n${String(form.get("question"))}\n\nName: ${String(form.get("name"))}`; window.location.href = `mailto:${booth.email || "meseventservices@gmail.com"}?subject=${encodeURIComponent(`Virtual booth enquiry: ${booth.id}`)}&body=${encodeURIComponent(body)}`; }}><label>Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="How should we address you?" /></label><label>Your question<textarea name="question" required maxLength={2000} rows={3} placeholder="I’d love to learn more about…" /></label><button className="btn btn-gold" type="submit">Prepare email enquiry ↗</button></form><p className="vb-info-note">Opens an email draft for you to review and send. Staff availability and appointment slots are not yet published.</p></div>}
    </section>}
  </div>;
}
