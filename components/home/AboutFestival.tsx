import festivalImage from "@/pics/fair4.png";

export function AboutFestival() {
  return (
    <section className="section section-about" id="about">
      <div className="container intro-grid">
        <div className="intro-heading">
          <span className="eyebrow">Welcome to Pyinyar Lam Sone</span>
          <h2>
            One Place. Multiple Pathways.{" "}
            <span style={{ color: "#b58d46" }}>Endless Opportunities.</span>
          </h2>
        </div>
        <div className="intro-image">
          <img
            loading="lazy"
            src={festivalImage.src}
            alt="Festival concept featuring seminars, student activities, networking, sponsor booths, and refreshments"
            width={festivalImage.width}
            height={festivalImage.height}
          />
          <div className="intro-accent">
            DISCOVER · CHOOSE · CONNECT
          </div>
        </div>
        <div>
          <p>
            Choosing the right education or career pathway is one of life's most
            important decisions. Pyinyar Lam Sone 2027 brings learning
            opportunities and industry insights together in one
            accessible platform.
          </p>
          <p>
            Whether you're a student planning your next academic step, a parent
            exploring education options, a graduate or
            a professional looking to upgrade your skills, there's a pathway
            waiting for you.
          </p>
          {/*
          <div className="three">
            <span className="pill">✦ Education</span>
            <span className="pill">✦ Career</span>
            <span className="pill">✦ Innovation</span>
          </div>
          */}
          <a href="/about" className="btn btn-navy">
            Discover the Festival &nbsp; →
          </a>
        </div>
      </div>
    </section>
  );
}
