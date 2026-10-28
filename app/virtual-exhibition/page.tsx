import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ExhibitionDirectory } from "@/components/exhibition/directory";
import "./exhibition.css";

export const metadata: Metadata = {
  title: "Virtual Exhibition | Pyinyar Lam Sone 2027",
  description: "Explore six education pathways, preview virtual booths, save your favorites and plan your next step at Pyinyar Lam Sone 2027.",
};

export default function VirtualExhibitionPage() {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header exhibition />
    <main id="main" className="expo-page">
      <section className="expo-hero" id="top">
        <div className="container">
          <div className="expo-breadcrumb"><a href="/">Home</a><span>/</span>Virtual exhibition</div>
          <div className="expo-hero-grid">
            <div className="expo-intro">
              <span className="eyebrow">ONE PLACE. MULTIPLE PATHWAYS.</span>
              <h1>Your next chapter.<br /><em>Explore it here.</em></h1>
              <p>Step into the virtual exhibition. Discover education pathways, explore digital booths and find the right direction for your future, wherever you are.</p>
              <div className="expo-hero-actions"><a href="/virtual-experience" className="btn btn-gold">Enter Virtual Experience <span aria-hidden="true">↗</span></a><span>30–31 January 2027<br /><small>In person &amp; online · Yangon</small></span></div>
              <div className="expo-hero-facts"><span><b>06</b> education zones</span><span><b>01</b> connected experience</span><span><b>∞</b> possibilities ahead</span></div>
            </div>
            <div className="expo-visual">
              <img src="/images/virtual-education-fair-workspace.webp" alt="Illustrated student discovering education pathways and connecting with institutions online" width={1536} height={1024} fetchPriority="high" />
              <div className="expo-image-note"><span className="expo-orbit" aria-hidden="true">✦</span><span><b>Your future, within reach.</b><small>Discover. Explore. Connect.</small></span></div>
              <span className="expo-image-label">THE VIRTUAL EXPERIENCE</span>
            </div>
          </div>
        </div>
      </section>
      <div className="expo-benefit-bar"><div className="container"><span>⌕ &nbsp; Discover your pathway</span><span>♡ &nbsp; Save your shortlist</span><span>▤ &nbsp; Explore courses &amp; resources</span><span>↗ &nbsp; Plan a conversation</span></div></div>
      <ExhibitionDirectory />
      <section className="expo-how container" aria-labelledby="expo-how-heading">
        <div><span className="eyebrow">MAKE IT YOUR OWN</span><h2 id="expo-how-heading">A little exploring.<br />A world of opportunity.</h2><p>Take your time. Your next step starts with the right information.</p></div>
        <ol><li><span>01</span><div><h3>Find your direction</h3><p>Browse six zones or narrow your search by destination, program and subject.</p></div></li><li><span>02</span><div><h3>Get to know a booth</h3><p>Explore pathways and resources. Save favorites to revisit on this browser.</p></div></li><li><span>03</span><div><h3>Start a conversation</h3><p>Prepare your questions and contact the organizing team about participation.</p></div></li></ol>
      </section>
      <section className="expo-invitation"><div className="container"><div><span className="eyebrow">FOR INSTITUTIONS &amp; EDUCATION PROVIDERS</span><h2>Be part of someone’s next chapter.</h2><p>Bring your institution to the Pyinyar Lam Sone virtual exhibition.</p></div><a className="btn btn-gold" href="mailto:meseventservices@gmail.com?subject=Virtual%20exhibition%20participation">Enquire about exhibiting ↗</a></div></section>
    </main>
    <Footer />
  </>;
}
