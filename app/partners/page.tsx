import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutIcon } from "@/components/about-icon";
import { PartnershipForm } from "./partnership-form";
import styles from "./partners.module.css";

export const metadata: Metadata = {
  title: "Partners | Pyinyar Lam Sone 2027",
  description: "Explore festival partnerships, compare VIP and Zone Partner packages, and connect with the Pyinyar Lam Sone 2027 partnership team.",
};

const benefits = [
  ["Preferred partner area", "VIP area", "Zone partner area"],
  ["Speaking opportunity", "15 minutes", "15 minutes"],
  ["Online / offline branding", "Highest tier", "Zone-focused tier"],
  ["Dedicated social posts", "3", "2"],
  ["Virtual booth", "Premium", "Premium"],
  ["Visitor insights", "Included, subject to consent", "Included, subject to consent"],
  ["MC announcements", "4 per day", "2 per day"],
  ["Post-event report", "Included", "Included"],
  ["Media opportunity", "Opening ceremony and press conference", "Press conference"],
];


export default function PartnersPage() {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header partners />
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="partners-title">
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Partners</span></nav>
          <div className={styles.heroGrid}>
            <div><span className="eyebrow">Our festival partners</span><h1 id="partners-title">Building Opportunities Through <span>Meaningful Partnerships.</span></h1><p>Pyinyar Lam Sone 2027 brings together organizations committed to supporting education, skills development, career exploration, and future opportunities.</p><p>Meet our participating partners and discover how their contributions help connect learners with education and industry.</p><div className={styles.actions}><a className="btn btn-navy" href="#partnerships">Become a Festival Partner <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#our-partners">Explore our partners ↓</a></div></div>
            <div className={styles.visual} aria-hidden="true"><div className={styles.orbit} /><div className={styles.orbitInner} /><span className={styles.centerIcon}><AboutIcon name="connection" /></span><span className={`${styles.orbitLabel} ${styles.labelOne}`}>Education</span><span className={`${styles.orbitLabel} ${styles.labelTwo}`}>Industry</span><span className={`${styles.orbitLabel} ${styles.labelThree}`}>Opportunity</span><span className={styles.visualCaption}>A shared purpose.<br /><strong>A connected future.</strong></span></div>
          </div>
          <div className={styles.ribbon}><span>30–31 January 2027</span><span>Myanmar Expo Hall · Yangon</span><span>Physical + Virtual Exhibition</span></div>
        </div>
      </section>

      <section id="our-partners" className={styles.section} aria-labelledby="directory-title"><div className="container">
        <span className="eyebrow">Our partners</span><div className={styles.sectionHeading}><h2 id="directory-title">Partners Supporting<br />the Future of Learning.</h2><p>Discover the organizations helping make education and career exploration more connected.</p></div>
        <div className={styles.categories}><a href="#vip-partners">VIP Partners ↗</a><a href="#zone-partners">Zone Partners ↗</a><a href="#partner-profiles">Education Partners ↗</a><a href="#partner-profiles">Supporting Organizations ↗</a></div>
        <div className={styles.directoryGrid}>
          <article id="vip-partners" className={styles.partnerPanel}><span className={styles.icon}><AboutIcon name="opportunity" /></span><h3>Meet Our VIP Partners.</h3><p>Our VIP partners receive prominent visibility throughout the festival experience, connecting their brands with visitors, education providers, and participating stakeholders.</p><p className={styles.pending}>VIP partner announcements are coming following confirmation.</p><a className={styles.textLink} href="#partnerships">Explore VIP partnership →</a></article>
          <article id="zone-partners" className={styles.partnerPanel}><span className={styles.icon}><AboutIcon name="choice" /></span><h3>Supporting Specialized Education Pathways.</h3><p>Zone partners contribute to the visibility and development of the festival&apos;s specialized education areas. Explore the six education zones and the pathways they support.</p><p className={styles.pending}>Zone partner profiles will be added following confirmation.</p><a className={styles.textLink} href="/zones">Explore the six education zones →</a></article>
        </div>
        <div id="partner-profiles" className={styles.spotlight}><div><span className="eyebrow">Partner spotlight</span><h3>Discover Our Featured Partners.</h3><p>Learn about partner initiatives, education programs, services, and festival activities.</p></div><div><strong>Partner profiles are being prepared.</strong><p>Confirmed profiles will include organization logos, descriptions, partnership categories, featured programs, physical booth locations, virtual booths, and relevant sessions. Education Partners and Supporting Organizations will also be featured here.</p></div></div>
      </div></section>

      <section id="partnerships" className={styles.invitation} aria-labelledby="invitation-title"><div className={`container ${styles.invitationGrid}`}><div><span className="eyebrow">Let&apos;s build the right partnership</span><h2 id="invitation-title">Partner With Us.<br /><span>Help Shape Future Opportunities.</span></h2><p>Connect your organization with students, parents, educators, professionals, and education service providers through Pyinyar Lam Sone 2027.</p><a className="btn btn-gold" href="#partnership-enquiry">Become a Festival Partner ↗</a></div><div className={styles.why}><span className={styles.icon}><AboutIcon name="future" /></span><h3>A Partnership That Connects Brand Visibility With Purpose.</h3><p>Position your organization at the center of education and career discovery. Our partnership opportunities combine prominent physical branding, digital exhibition visibility, audience engagement, and networking opportunities.</p><p>Through integrated physical and digital activities, partners can build awareness, share valuable information, engage potential customers, and contribute to the festival&apos;s education ecosystem.</p></div></div></section>

      <section className={styles.section} aria-labelledby="packages-title"><div className="container"><span className="eyebrow">Partnership packages</span><div className={styles.sectionHeading}><h2 id="packages-title">Find your place at the festival.</h2><p>Two ways to connect your organization with our education community.</p></div><div className={styles.packageGrid}>
        <article className={`${styles.package} ${styles.vip}`}><span className={styles.tag}>Flagship package</span><h3>VIP Partner</h3><a className={styles.textLink} href="#partnership-enquiry">Enquire Pricing <span aria-hidden="true">↗</span></a><p>A prominent presence across the festival experience.</p><ul><li>Preferred VIP partner area and a 15-minute seminar slot</li><li>Prominent online and offline branding</li><li>Three dedicated social media posts</li><li>Prioritized premium virtual booth</li><li>Lead generation and visitor insights, subject to consent</li><li>Post-event reporting and event announcements</li><li>Opening ceremony and press conference participation</li></ul><a className="btn btn-gold" href="#partnership-enquiry">Enquire About VIP Partnership ↗</a></article>
        <article className={styles.package}><span className={styles.tag}>Partner a specialized education zone</span><h3>Zone Partner</h3><a className={styles.textLink} href="#partnership-enquiry">Enquire Pricing <span aria-hidden="true">↗</span></a><ul><li>Designated zone partner area and a 15-minute seminar slot</li><li>Zone signage branding</li><li>Two dedicated social media posts</li><li>Prioritized premium virtual booth</li><li>Available visitor insights, subject to consent</li><li>Post-event reporting</li></ul><a className="btn btn-navy" href="#partnership-enquiry">Enquire About Zone Partnership ↗</a></article>
      </div><p className={styles.packageNote}>Package details and availability are subject to confirmation with the organizing team.</p></div></section>

      <section className={styles.comparison} aria-labelledby="comparison-title"><div className="container"><span className="eyebrow">Compare partnership benefits</span><h2 id="comparison-title">The details, side by side.</h2><div className={styles.tableScroll} role="region" aria-label="Partnership benefits comparison" tabIndex={0}><table><caption className={styles.srOnly}>VIP Partner and Zone Partner benefit comparison</caption><thead><tr><th scope="col">Benefit</th><th scope="col">VIP Partner</th><th scope="col">Zone Partner</th></tr></thead><tbody>{benefits.map(([benefit, vip, zone]) => <tr key={benefit}><th scope="row">{benefit}</th><td>{vip}</td><td>{zone}</td></tr>)}</tbody></table></div></div></section>

      <section id="partnership-enquiry" className={styles.section} aria-labelledby="enquiry-title"><div className={`container ${styles.enquiryGrid}`}><div><span className="eyebrow">Partnership enquiry</span><h2 id="enquiry-title">Let&apos;s Create a Partnership That Makes an Impact.</h2><p>Tell us about your organization, partnership interests, and promotional goals. Our team will discuss available packages and opportunities with you.</p><div className={styles.directContact}><span>Prefer to speak with our team?</span><a href="mailto:meseventservices@gmail.com">meseventservices@gmail.com ↗</a><a href="/contact">View organizer contact details →</a></div></div><PartnershipForm /></div></section>
    </main><Footer />
  </>;
}
