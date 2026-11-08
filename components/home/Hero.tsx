import { NoticeButton } from "@/components/notice-provider";
import { Countdown } from "@/components/countdown";
import heroImage from "@/pics/fair1crp.png";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">ပညာလမ်းဆုံ &nbsp; • &nbsp; 2027</span>
          <h1>
            ပညာလမ်းဆုံ
            <br />
            <em className="hero-festival-title">Education &amp; Career Pathways Festival</em>
          </h1>
          <p
            style={{
              color: "#f1d7a1",
              fontWeight: "700",
              letterSpacing: ".035em",
            }}
          >
            LEARN. EXPLORE. BUILD YOUR FUTURE.
          </p>
          <p>
            Discover schools, universities, language programs, professional
            skills, overseas education and career opportunities—all in one
            inspiring festival, in person and online.
          </p>
          <div className="hero-actions">
            <NoticeButton
              className="btn btn-gold"
              message="Visitor registration will open once the registration service is ready."
            >
              Register to Visit <span>↗</span>
            </NoticeButton>
            <a className="btn btn-light" href="/virtual-exhibition">
              Explore Virtual Expo <span>→</span>
            </a>
          </div>
          <Countdown />
          <div className="hero-mini">
            <span>6 Education Zones</span>
            <span>2 Inspiring Days</span>
            <span>Physical + Virtual</span>
          </div>
        </div>
        <div className="hero-art">
          <img
            src={heroImage.src}
            alt="Education exhibition concept with visitors exploring booths across six education zones"
            width={heroImage.width}
            height={heroImage.height}
          />
          <div className="hero-side">
            <svg
              className="hero-date-icon"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2" />
            </svg>
            <div>
              <b>30–31 JAN 2027</b>
              Fortune Plaza, Yangon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
