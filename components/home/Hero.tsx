import { NoticeButton } from "@/components/notice-provider";
import { Countdown } from "@/components/countdown";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">ပညာလမ်းဆုံ &nbsp; • &nbsp; 2027</span>
          <h1>
            One Festival.
            <br />
            <em>Infinite Possibilities.</em>
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
            <a className="btn btn-light" href="#virtual">
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
            src="/images/festival-hero.webp"
            alt="Artist's concept of an elegant education and career festival in Myanmar"
            width={1350}
            height={760}
          />
          <div className="hero-side">
            <span className="star">✦</span>
            <div>
              <b>30–31 JAN</b>
              <small>2027 · Yangon, Myanmar</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
