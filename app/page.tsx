import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/Hero";
import { FestivalFacts } from "@/components/home/FestivalFacts";
import { AboutFestival } from "@/components/home/AboutFestival";
import { EducationZones } from "@/components/home/EducationZones";
import { FestivalAttractions } from "@/components/home/FestivalAttractions";
import { VirtualExhibition } from "@/components/home/VirtualExhibition";
import { ExhibitorIntroduction } from "@/components/home/ExhibitorIntroduction";
import { StageProgram } from "@/components/home/StageProgram";
import { VisitorGuide } from "@/components/home/VisitorGuide";
import { FestivalPartners } from "@/components/home/FestivalPartners";
import { ClosingInvitation } from "@/components/home/ClosingInvitation";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <FestivalFacts />
        <AboutFestival />
        <EducationZones />
        <FestivalAttractions />
        <VirtualExhibition />
        <ExhibitorIntroduction />
        <StageProgram />
        <VisitorGuide />
        <FestivalPartners />
        <ClosingInvitation />
      </main>
      <Footer />
    </>
  );
}
