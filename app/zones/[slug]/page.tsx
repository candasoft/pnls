import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import zones from "../zones.json";
import styles from "../zones.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return zones.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = zones.find((item) => item.slug === slug);
  return zone ? { title: `${zone.title} | Pyinyar Lam Sone 2027`, description: zone.description[0] } : {};
}

export default async function ZonePage({ params }: Props) {
  const { slug } = await params;
  const zone = zones.find((item) => item.slug === slug);
  if (!zone) notFound();
  const index = zones.indexOf(zone);
  const ctaTargets: Record<string, string[]> = {
    academic: ["#exhibitors", "/floor-plan"],
    "higher-education": ["#programs", "#exhibitors"],
    language: ["#exhibitors", "#programs"],
    skills: ["#programs", "#exhibitors"],
    overseas: ["#programs", "#exhibitors"],
    services: ["#programs", "#exhibitors"],
  };
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header zones />
    <main id="main" className={styles.page} style={{ "--zone-tint": zone.tint } as CSSProperties}>
      <section className={styles.detailHero} aria-labelledby="zone-title"><div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/zones">Education zones</Link><span aria-hidden="true">/</span><span aria-current="page">{zone.title}</span></nav>
        <div className={styles.detailHeading}><div><span className="eyebrow">0{index + 1} / {zone.title}</span><h1 id="zone-title">{zone.headline}</h1><div className={styles.detailIntro}>{zone.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className={styles.actions}>{zone.ctas.map((cta, i) => <a key={cta} className={i === 0 ? "btn btn-navy" : styles.textLink} href={ctaTargets[zone.slug][i]}>{cta} <span aria-hidden="true">↗</span></a>)}</div></div><div className={styles.detailArt} aria-hidden="true"><span className={styles.artNumber}>0{index + 1}</span><img src={`/images/zones/${zone.image}`} width="720" height="480" alt="" loading="eager" /><span className={styles.artCaption}>{zone.kicker}</span></div></div>
      </div></section>
      <nav className={styles.zoneNav} aria-label="Education zones"><div className="container">{zones.map((item) => <Link key={item.slug} href={`/zones/${item.slug}`} aria-current={item.slug === zone.slug ? "page" : undefined}>{item.title}</Link>)}</div></nav>
      <section className={styles.contentSection} aria-labelledby="programs-title"><div className={`container ${styles.contentGrid}`}>
        <div id="programs" className={styles.anchor}><span className="eyebrow">Discover the possibilities</span><h2 id="programs-title">Explore {zone.slug === "services" ? "services" : zone.slug === "overseas" ? "opportunities" : "programs"}</h2><ul className={styles.programs}>{zone.programs.map((program, i) => <li key={program}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3>{program}</h3><span aria-hidden="true">↗</span></li>)}</ul></div>
        <aside className={styles.audience}><span className="eyebrow">Is this your next step?</span><h2>Who should explore this zone?</h2><p>{zone.audience}</p><div className={styles.audienceNote}><span aria-hidden="true">✦</span><p>Your journey can span several zones. Take time to explore the pathways that interest you.</p></div><Link className={styles.textLink} href="/zones">Explore all six zones <span aria-hidden="true">↗</span></Link></aside>
      </div></section>
      {zone.questions.length > 0 && <section className={styles.questions} aria-labelledby="questions-title"><div className={`container ${styles.contentGrid}`}><div><span className="eyebrow">Make every conversation count</span><h2 id="questions-title">Questions to ask exhibitors</h2><p>A little preparation helps you compare your options and take a more confident next step.</p></div><ol>{zone.questions.map((question) => <li key={question}>{question}</li>)}</ol></div></section>}
      <section className={styles.contentSection} aria-labelledby="plan-title"><div className="container"><div className={styles.sectionHeading}><div><span className="eyebrow">Connect. Learn. Explore.</span><h2 id="plan-title">Plan your zone visit</h2></div></div><div className={styles.infoGrid}>
        <article id="exhibitors" className={styles.infoCard}><span className={styles.status}>Details to be announced</span><h3>Participating exhibitors</h3><p>The {zone.title} exhibitor list will be published once participation is confirmed. Contact the organizing team for provider and advisor enquiries.</p><Link href="/contact">Enquire about exhibitors <span aria-hidden="true">↗</span></Link></article>
        <article className={styles.infoCard}><span className={styles.status}>Schedule to be announced</span><h3>Relevant seminars</h3><p>Seminar topics, speakers, and session times for this zone will be shared when the festival program is confirmed.</p><Link href="/contact">Ask about seminars <span aria-hidden="true">↗</span></Link></article>
        <article className={styles.infoCard}><span className={styles.status}>Details to be announced</span><h3>Zone sponsors</h3><p>Confirmed zone sponsors and partner details will appear here. Explore sponsorship opportunities with the organizing team.</p><Link href="/contact">Enquire about sponsorship <span aria-hidden="true">↗</span></Link></article>
      </div></div></section>
      <section className={styles.visit} aria-labelledby="map-title"><div className={`container ${styles.visitInner}`}><div><span className="eyebrow">Find your way around</span><h2 id="map-title">Locate {zone.title === "Education Services Zone" ? "the Education Services Zone" : `the ${zone.title}`}</h2><p>View the festival floor plan to explore the hall layout, zone locations, and visitor facilities.</p></div><div className={styles.visitActions}><Link className="btn btn-gold" href="/floor-plan">View the Floor Plan <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/zones">Back to all zones <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
    <Footer />
  </>;
}
