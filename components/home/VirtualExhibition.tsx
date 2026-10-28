export function VirtualExhibition() {
  return (
    <section className="section showcase" id="virtual">
      <div className="container showcase-grid">
        <div>
          <span className="eyebrow">Digital experience</span>
          <h2>Can't attend in person? <br></br>Join Virtual Exhibition</h2>
          <p>
            Your Future Is Still Within Reach—Wherever You Are. Explore education opportunities through the
            Pyinyar Lam Sone Virtual Exhibition. Discover participating
            institutions, digital brochures, course information, videos and ways
            to connect online.
          </p>
          <div className="showcase-points">
            <span>Searchable Virtual Booths</span>
            <span>Institution Videos</span>
            <span>Digital Brochures</span>
            <span>Inquiries & Consultations</span>
          </div>
          <a
            className="btn btn-gold"
            href="/virtual-exhibition"
          >
            Enter Virtual Exhibition ↗
          </a>
        </div>
        <img
          loading="lazy"
          src="/images/virtual-education-fair-workspace.webp"
          alt="Illustration of a student exploring virtual education booths, digital brochures and an online consultation from her laptop"
          width={1536}
          height={1024}
        />
      </div>
    </section>
  );
}
