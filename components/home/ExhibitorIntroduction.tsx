export function ExhibitorIntroduction() {
  return (
    <section className="section" id="exhibitors">
      <div className="container">
        <div className="sect-head">
          <div>
            <span className="eyebrow">Discover institutions</span>
            <h2>Meet the Institutions Shaping Tomorrow.</h2>
            <p className="lead">
              Connect with schools, universities, training centers and overseas
              education consultants. Compare your options and learn about
              programs that match your interests.
            </p>
          </div>
        </div>
        <div className="split-cards">
          <div className="image-card">
            <img
              loading="lazy"
              src="/images/education-zones.webp"
              alt="Concept illustration of six education zones inside the festival"
              width={1050}
              height={591}
            />
            <div className="image-card-body">
              <h3>Find Your Ideal Institution</h3>
              <p>
                Our planned exhibitor directory will help you search by
                education zone, study interest and program type.
              </p>
              <a href="#zones">Browse the Six Zones →</a>
            </div>
          </div>
          <div className="image-card">
            <img
              loading="lazy"
              src="/images/festival-activities.webp"
              alt="Concept illustration of seminars, discussions and education festival activities"
              width={1050}
              height={591}
            />
            <div className="image-card-body">
              <h3>Discover Festival Activities</h3>
              <p>
                Explore education talks, partner sessions, interactive games and
                meaningful learning experiences.
              </p>
              <a href="#program">Explore the Stage Program →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
