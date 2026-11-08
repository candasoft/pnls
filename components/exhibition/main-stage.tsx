"use client";

import { useEffect, useRef, useState } from "react";
import { mainStageStream, youtubeVideoId } from "./stage-stream";
import { trackExperience } from "./experience-analytics";

export function MainStage() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const videoId = youtubeVideoId(mainStageStream.youtubeUrl);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  return <>
    <button className="vx-stage" type="button" ref={trigger} aria-haspopup="dialog" aria-controls="main-stage-dialog" aria-label="Watch the main stage on YouTube" onClick={() => { trackExperience({ type: "stage" }); setOpen(true); }}>
      MAIN STAGE<span>{mainStageStream.title}</span>
      <svg className="vx-stage-play" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" stroke="currentColor" /><path d="m10 8 6 4-6 4V8Z" fill="currentColor" /></svg>
    </button>
    <dialog id="main-stage-dialog" className="vx-stage-dialog" ref={dialog} aria-labelledby="main-stage-title" onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {open && <>
        <div className="vx-stage-header"><div><span>PYINYAR LAM SONE 2027 · FESTIVAL BROADCAST</span><h2 id="main-stage-title">Live from the main stage</h2><p>{mainStageStream.title}</p></div><button type="button" aria-label="Close main-stage video" onClick={() => dialog.current?.close()}>×</button></div>
        <div className="vx-stage-player">
          {videoId ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`} title="Pyinyar Lam Sone main-stage YouTube livestream" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="vx-stage-placeholder"><svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" /><path d="m33 26 23 14-23 14V26Z" fill="currentColor" /></svg><span className="vx-stage-announcement">BROADCAST LINK COMING SOON</span><h3>Take a seat. The stage is yours.</h3><p>The festival’s YouTube livestream will appear here once the broadcast link is announced.</p></div>}
        </div>
        <div className="vx-stage-footer"><div><strong>30–31 January 2027</strong><span>9:00 AM–5:00 PM · Myanmar time</span></div>{videoId ? <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a> : <span>Education · Careers · New possibilities</span>}</div>
        {videoId && <p className="vx-stage-playback-note">If playback is unavailable in the popup, use “Watch on YouTube.”</p>}
      </>}
    </dialog>
  </>;
}
