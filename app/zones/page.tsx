import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import zones from "./zones.json";
import styles from "./zones.module.css";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Explore Six Education Zones | Pyinyar Lam Sone 2027",
  description: "Find your path. Explore academic, higher education, language, skill, overseas education, and education services zones at Pyinyar Lam Sone 2027.",
};

export default function ZonesPage() {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header zones />
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="zones-title">
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Education zones</span></nav>
          <div className={styles.heroHeading}>
            <div><span className="eyebrow">Six zones. One world of opportunities.</span><h1 id="zones-title">Find Your Path.<br /><span>Explore Your Possibilities.</span></h1></div>
            <div className={styles.intro}><p>Every learner&apos;s journey is different. Explore six specialized education zones designed to help you discover institutions, programs, skills, and services that support your next step.</p><a href="#explore" className={styles.textLink}>Find your starting point <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className={styles.ribbon}><span>Discover your options</span><i aria-hidden="true">✦</i><span>Meet education providers</span><i aria-hidden="true">✦</i><span>Plan your next chapter</span></div>
        </div>
      </section>
      <section id="explore" className={styles.explore} aria-labelledby="explore-title">
        <div className="container">
          <div className={styles.sectionHeading}><div><span className="eyebrow">A place for every ambition</span><h2 id="explore-title">Where will you begin?</h2></div><p>Choose a zone to explore its programs,<br />who it&apos;s for, and what to ask.</p></div>
          <div className={styles.grid}>
            {zones.map((zone, index) => <article key={zone.slug} className={styles.card} style={{ "--zone-tint": zone.tint } as CSSProperties}>
              <div className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")} / EXPLORE</span><span aria-hidden="true">↗</span></div>
              <div className={styles.cardCopy}><span className={styles.kicker}>{zone.kicker}</span><h3><Link href={`/zones/${zone.slug}`}>{zone.title}</Link></h3><p>{zone.headline}</p></div>
              <div className={styles.cardArt} aria-hidden="true"><img src={`/images/zones/${zone.image}`} width="720" height="480" alt="" loading="lazy" /></div>
              <div className={styles.cardFooter}><span>{zone.programs.length} areas to explore</span><Link href={`/zones/${zone.slug}`} aria-label={`Explore ${zone.title}`}>Explore zone <span aria-hidden="true">↗</span></Link></div>
            </article>)}
          </div>
        </div>
      </section>
      <section className={styles.visit} aria-labelledby="visit-title"><div className={`container ${styles.visitInner}`}><div><span className="eyebrow">Your day, your direction</span><h2 id="visit-title">Six starting points.<br />Your next chapter.</h2><p>Explore more than one zone. Compare pathways, prepare your questions, and find your way around the festival before you arrive.</p></div><div className={styles.visitActions}><Link className="btn btn-gold" href="/floor-plan">Explore the Floor Plan <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact">Talk to the organizing team <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
    <Footer />
  </>;
}
