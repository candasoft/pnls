import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloorPlan } from "@/components/floor-plan/floor-plan";
import "./floor-plan.css";

export const metadata: Metadata = {
  title: "Floor Plan | Pyinyar Lam Sone 2027",
  description: "Explore the festival hall in 3D. Find education zones, booths, VIP areas, the main stage and visitor facilities at Myanmar Expo Hall.",
};

export default function FloorPlanPage() {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header floorPlan />
    <main id="main" className="fp-page">
      <section className="fp-hero">
        <div className="container">
          <div className="fp-breadcrumb"><a href="/">Home</a><span>/</span>Floor plan</div>
          <div className="fp-heading"><div><span className="eyebrow">A LITTLE PLANNING. MORE DISCOVERING.</span><h1>Find your way.<br /><em>Discover your future.</em></h1><p>Get to know the festival before you arrive. Explore the hall, find your zone and make room for something unexpected.</p></div><div className="fp-venue"><span className="fp-venue-icon" aria-hidden="true">⌖</span><div><strong>Myanmar Expo Hall</strong><span>Fortune Plaza · Yangon</span><small>30–31 January 2027 &nbsp; / &nbsp; 9 AM – 5 PM</small></div></div></div>
        </div>
      </section>
      <FloorPlan />
      <section className="container fp-visit"><div><span className="eyebrow">YOUR DAY, YOUR DIRECTION</span><h2>A few useful landmarks.</h2></div><div className="fp-landmarks"><article><span>01 / ARRIVE</span><h3>Start at reception</h3><p>Reception is in the lobby. The entrance is to the left of the photobooth; the exit is to its right.</p></article><article><span>02 / EXPLORE</span><h3>Follow your curiosity</h3><p>Discover six education zones, with premium booths on the left and service booths on the right.</p></article><article><span>03 / RECHARGE</span><h3>Make a day of it</h3><p>Find the stage at the far end of the hall, the food court near the doors, and activities in the lobby.</p></article></div></section>
      <section className="fp-help"><div className="container"><div><h2>Let’s find your place.</h2><p>Questions about a booth or planning your visit? Talk to our organizing team.</p></div><a className="btn btn-gold" href="/contact">Get in touch ↗</a></div></section>
    </main>
    <Footer />
  </>;
}
