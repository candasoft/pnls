"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const zones = [
  { title: "Academic Zone", description: "Preschools, primary and secondary schools, GED, IGCSE and A-Level programs.", image: "academic-art.webp", tint: "#f2d9bd", link: "Explore Academic Pathways" },
  { title: "Higher Education Zone", description: "Explore colleges, local private universities, business schools and degree pathways.", image: "higher-education-art.webp", tint: "#d9e2ef", link: "Explore Higher Education" },
  { title: "Language Zone", description: "English, IELTS preparation and other foreign language programs for every ambition.", image: "language-art.webp", tint: "#d9e9dd", link: "Explore Language Programs" },
  { title: "Skill Zone", description: "Vocational training, professional skills, engineering, arts and career development.", image: "skill-art.webp", tint: "#e6dced", link: "Explore Skills Training" },
  { title: "Overseas Education Zone", description: "Study abroad advisors, international universities, application guidance and scholarships.", image: "overseas-art.webp", tint: "#d2e8eb", link: "Explore Global Opportunities" },
  { title: "Education Services Zone", description: "Technology, education finance, insurance, books and travel support services.", image: "services-art.webp", tint: "#f0e4be", link: "Explore Education Services" },
];

export function EducationZones() {
  const gallery = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft <= 8, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  function move(direction: number) {
    const element = gallery.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const distance = (card?.offsetWidth ?? 300) + parseFloat(getComputedStyle(element).columnGap);
    element.scrollBy({ left: distance * direction, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="section zones" id="zones">
      <div className="container">
        <div className="sect-head">
          <div>
            <span className="eyebrow">Explore your future</span>
            <h2>Six Zones. One World of Opportunities.</h2>
          </div>
        </div>
        <div className="zone-gallery-stage">
          <div className="zone-gallery" id="zone-gallery" ref={gallery} role="region" aria-label="Six education zones" tabIndex={0}>
          {zones.map((zone, index) => (
            <article className="zone-gallery-card" key={zone.title} style={{ "--zone-tint": zone.tint } as CSSProperties}>
              <div className="zone-gallery-copy">
                <span className="zone-gallery-kicker">Find your pathway</span>
                <h3>{zone.title}</h3>
                <p>{zone.description}</p>
              </div>
              <div className="zone-gallery-art" aria-hidden="true">
                <img src={`/images/zones/${zone.image}`} width={720} height={480} alt="" loading="lazy" />
              </div>
              <div className="zone-gallery-footer">
                <span className="zone-gallery-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <a href="#plan" aria-label={zone.link}>Explore zone <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
          <div className="zone-gallery-controls">
            <button type="button" aria-label="Previous education zone" aria-controls="zone-gallery" disabled={edges.start} onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="Next education zone" aria-controls="zone-gallery" disabled={edges.end} onClick={() => move(1)}>→</button>
          </div>
        </div>
        <div className="zone-study-scene" aria-hidden="true">
          <img src="/images/zones/study-desk.webp" width={1500} height={600} alt="" loading="lazy" />
        </div>
        <p className="zone-gallery-caption">Six starting points. Your next chapter.</p>
      </div>
    </section>
  );
}
