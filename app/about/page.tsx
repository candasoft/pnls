import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import festival from "@/pics/cover.jpg";
import organizerLogo from "@/pics/organizer.png";
import styles from "./about.module.css";
import { AboutIcon, type AboutIconName } from "@/components/about-icon";

const pillarIcons: AboutIconName[] = ["access", "choice", "guidance", "connection", "opportunity", "future"];
const audienceIcons: AboutIconName[] = ["student", "parents", "graduate", "work", "educator"];

export const metadata: Metadata = {
  title: "About the Festival | Pyinyar Lam Sone 2027",
  description: "Connecting Education, Careers, and the Future of Myanmar. Discover the mission, core promise and vision of Pyinyar Lam Sone – Education & Career Pathways Festival 2027.",
};

const pillars = [
  ["Access", "Make education and career information easier to discover in one place."],
  ["Choice", "Enable visitors to explore and compare institutions, programs, and services."],
  ["Guidance", "Provide insights from educators, professionals, and study advisors."],
  ["Connection", "Bring students, parents, institutions, and industry together."],
  ["Opportunity", "Highlight scholarships, special offers, training, and career possibilities."],
  ["Future Readiness", "Encourage education and skills development aligned with future opportunities."],
];

const audiences = [
  ["Students", "Discover schools, universities, qualifications, and learning opportunities for your next academic stage."],
  ["Parents", "Meet education providers and explore suitable learning environments and programs for your children."],
  ["Graduates", "Explore higher education, professional training, career preparation, and further study."],
  ["Working Professionals", "Discover upskilling, reskilling, and continuing education options."],
  ["Educators and Institutions", "Connect with learners, partners, and the wider education community."],
];

export default function AboutPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <Header about />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">About the festival</span>
            </nav>
            <div className={styles.heroHeading}>
              <span className={styles.heroSpark}><AboutIcon name="spark" /></span>
              <div>
                <span className="eyebrow">About the Festival</span>
                <h1 id="about-title">Connecting Education, Careers, and <span>the Future of Myanmar.</span></h1>
              </div>
              <div className={styles.heroIntro}>
                <p>Pyinyar Lam Sone – Education &amp; Career Pathways Festival 2027 is an education and career discovery platform designed to connect students, parents, educational institutions, industry professionals, and education service providers.</p>
                <p>Our mission is to make education and career exploration more accessible, informative, and connected.</p>
              </div>
            </div>
            <figure className={styles.heroImage}>
              <Image src={festival} alt="Pyinyar Lam Sone Education and Career Pathways Festival 2027 cover featuring learners and professionals, held 30–31 January at Myanmar Expo Hall, Fortune Plaza" sizes="(max-width: 1238px) 100vw, 1190px" loading="eager" placeholder="blur" />
              <figcaption>Discover. Connect. Choose. <span>Festival cover</span></figcaption>
            </figure>
            <div className={styles.imageRibbon} aria-hidden="true"><span>Education</span><i>✦</i><span>Careers</span><i>✦</i><span>Connections</span><i>✦</i><span>Possibilities</span></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="story-title">
          <div className={`container ${styles.story}`}>
            <div className={styles.storyVisual}><span className="eyebrow">Education meets possibility</span><h2 id="story-title">What is Pyinyar Lam Sone?</h2><div className={styles.pathwayArt}><Image src="/images/about/pathways.webp" width={1000} height={667} sizes="(max-width: 600px) 100vw, 520px" alt="An open book unfolding into golden pathways toward a university arch" loading="lazy" /></div></div>
            <div className={styles.copy}>
              <p className={styles.largeCopy}>Pyinyar Lam Sone brings together education providers, training institutions, career opportunities, and supporting services within one integrated festival.</p>
              <p>Visitors can explore different education pathways, meet representatives, compare available programs, discover scholarship opportunities, and gain insights into their future career choices.</p>
              <p>The festival combines a physical exhibition, knowledge-sharing sessions, interactive activities, and a virtual exhibition to provide an inclusive experience for participants.</p>
            </div>
          </div>
        </section>

        <section className={styles.promise} aria-labelledby="promise-title">
          <div className={styles.orbit} aria-hidden="true"><span /><span /><span /></div>
          <div className={`container ${styles.promiseInner}`}>
            <div className={styles.promiseSymbol} aria-hidden="true"><AboutIcon name="choice" /></div>
            <span className="eyebrow" id="promise-title">Our core promise</span>
            <h2>One Place – Multiple Pathways.</h2>
            <p>We believe meaningful education decisions begin with access to the right information and connections.</p>
            <p>Through Pyinyar Lam Sone, we aim to help visitors discover possibilities, connect with relevant providers, and make confident choices about their future.</p>
          </div>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-title">
          <div className="container">
            <div className={styles.sectionHeading}><h2 id="pillars-title">Why this festival matters</h2></div>
            <div className={styles.pillarGrid}>
              {pillars.map(([title, description], index) => <article className={styles.pillar} key={title}><div className={styles.pillarTop}><span className={styles.icon}><AboutIcon name={pillarIcons[index]} /></span><span className={styles.number} aria-hidden="true">0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="audience-title">
          <div className={`container ${styles.audience}`}>
            <div className={styles.audienceVisual}><span className="eyebrow">A place for every ambition</span><h2 id="audience-title">Who should attend?</h2><div className={styles.communityArt}><Image src="/images/about/community.webp" width={1000} height={667} sizes="(max-width: 600px) 100vw, 520px" alt="Illustration of Myanmar students, a graduate, a parent and an educator together" loading="lazy" /></div></div>
            <div className={styles.audienceGrid}>{audiences.map(([title, description], index) => <article key={title}><span className={styles.audienceIcon}><AboutIcon name={audienceIcons[index]} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
          </div>
        </section>

        <section className={styles.vision} aria-labelledby="vision-title">
          <div className={`container ${styles.promiseInner}`}>
            <span className="eyebrow" id="vision-title">Our vision</span>
            <div className={styles.visionSteps} aria-hidden="true"><span><AboutIcon name="search" /></span><i /><span><AboutIcon name="connection" /></span><i /><span><AboutIcon name="check" /></span></div>
            <h2>Discover. Connect. Choose.</h2>
            <p>We envision a platform where every learner can access information, meet education providers, and explore pathways that match their ambitions.</p>
          </div>
        </section>

        <section className={styles.invitation} aria-labelledby="organizer-title">
          <div className={`container ${styles.organizer}`}>
            <div><div className={styles.organizerLogo}><Image src={organizerLogo} alt="MES – Marketing, Events, Solutions" sizes="280px" loading="lazy" /></div><h2 id="organizer-title">About the organizer</h2></div>
            <div>
              <p className={styles.organizerName}>Organized by <strong>MES – Marketing • Events • Solutions</strong></p>
              <p>MES is the organizer of Pyinyar Lam Sone 2027, bringing together participating education institutions, partners, sponsors, and supporting organizations to deliver a connected education and career discovery experience.</p>
              <div className={styles.actions}><a className="btn btn-gold" href="mailto:meseventservices@gmail.com">Contact the Organizing Team <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
