import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BoothExperience } from "@/components/exhibition/booth-experience";
import "./experience.css";
import "./visual-booth.css";
import "./main-stage.css";
import "./analytics.css";

export const metadata: Metadata = {
  title: "Virtual Experience | Pyinyar Lam Sone 2027",
  description: "Walk through the virtual booth layout, discover education providers and explore their profiles, videos and resources.",
};

export default function VirtualExperiencePage() {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header exhibition experience />
    <main id="main" className="vx-page">
      <div className="container vx-heading">
        <div className="vx-breadcrumb"><a href="/">Home</a><span>/</span><a href="/virtual-exhibition">Virtual exhibition</a><span>/</span>Virtual experience</div>
        <span className="eyebrow">EXPLORE THE FESTIVAL, BOOTH BY BOOTH</span>
        <h1>Virtual <em>Experience</em></h1>
        <p>Find a school. Open a booth. Discover your next step.</p>
      </div>
      <BoothExperience />
    </main>
    <Footer />
  </>;
}
