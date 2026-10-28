export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: "18px" }}>
              <img
                className="brand-mark"
                src="/images/footer-logo.webp"
                alt="Pyinyar Lam Sone logo"
                width={400}
                height={293}
              />
              <span className="brand-title" style={{ color: "white" }}>
                PYINYAR LAM SONE
                <small>EDUCATION & CAREER PATHWAYS FESTIVAL</small>
              </span>
            </div>
            <p>
              Connecting students, parents, educational institutions and
              industry professionals to explore pathways and build brighter
              futures.
            </p>
            <p>
              Organized by{" "}
              <strong style={{ color: "#f0d08c" }}>
                MES — Marketing · Events · Solutions
              </strong>
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <a href="/#about">About the Festival</a>
              <a href="/#zones">Six Education Zones</a>
              <a href="/#activities">Festival Attractions</a>
              <a href="/virtual-exhibition">Virtual Exhibition</a>
              <a href="/virtual-experience">Virtual Experience</a>
              <a href="/#partners">Our Partners</a>
            </div>
          </div>
          <div>
            <h3>Get in Touch</h3>
            <p>
              Myanmar Expo Hall (Fortune Plaza)
              <br />
              Thaketa Township, Yangon
            </p>
            <p>
              30–31 January 2027
              <br />
              9:00 AM – 5:00 PM
            </p>
            <a href="mailto:meseventservices@gmail.com">
              meseventservices@gmail.com
            </a>
            <p>
              <a
                href="https://www.mesmyanmar.com"
                target="_blank"
                rel="noopener"
              >
                mesmyanmar.com
              </a>{" "}
              ·{" "}
              <a href="https://www.pyinyar.com" target="_blank" rel="noopener">
                pyinyar.com
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2027 Pyinyar Lam Sone. All rights reserved.</span>
          <span>
            Festival targets and activity categories are preliminary and subject
            to confirmation.
          </span>
        </div>
      </div>
    </footer>
  );
}

