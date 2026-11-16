import styles from "./StageProgram.module.css";

const blocks = [
  {
    label: "01 / Discover your direction", title: "Big ideas. Fresh perspectives.", period: "Morning · 10:00–11:30",
    sessions: [
      ["10:00", "10:15", "Expert talk", "blue", "Your Next Chapter Starts Here", "Academic & higher education pathways: choosing qualifications, schools and degrees that fit your ambitions."],
      ["10:15", "10:30", "Founder stories", "gold", "Many Routes. One Remarkable Journey.", "Education founders share their own study pathways, turning points and lessons beyond the classroom."],
      ["10:30", "10:45", "Global study advice", "mint", "Dream Global. Plan Smart.", "Overseas study & scholarships: comparing destinations, preparing applications and exploring funding."],
      ["10:45", "11:00", "Career discovery", "blue", "After School, What’s Next?", "Experts unpack careers, emerging industries and practical ways to discover what you enjoy doing."],
      ["11:00", "11:15", "Skills spotlight", "mint", "Build Skills. Open Doors.", "Skills & career development: vocational routes, creative careers and the abilities employers value."],
      ["11:15", "11:30", "Quiz & lucky draw", "coral", "Think Fast. Get Involved!", "Put your new knowledge to the test with an audience quiz and a proposed lucky draw."],
    ],
  },
  {
    label: "02 / Turn inspiration into action", title: "Hands on. Spotlight on you.", period: "Afternoon · 13:30–15:00",
    sessions: [
      ["13:30", "13:45", "Live demonstration", "mint", "Meet Your Digital Learning Toolkit", "Explore digital learning tools, AI-assisted study and innovation demonstrations with practical examples."],
      ["13:45", "14:00", "Expert talk", "blue", "Find a Pathway That Fits You", "Compare university, professional qualifications and work-based learning with education and career experts."],
      ["14:00", "14:15", "Study abroad clinic", "gold", "Your Global Study Questions, Unpacked", "A short advice session on study planning, student life and preparing for an international education."],
      ["14:15", "14:30", "Activities & games", "coral", "Play. Connect. Discover.", "Team challenges and interactive games that bring problem-solving, creativity and collaboration to life."],
      ["14:30", "14:45", "Talent competition", "gold", "Your Moment in the Spotlight", "A proposed showcase for student talent, creative performances and fresh ideas. Entry details to follow."],
      ["14:45", "15:00", "Quiz & lucky draw", "coral", "One More Round of Excitement", "Wrap up with audience participation, a final quiz and a proposed lucky draw celebration."],
    ],
  },
];

export function StageProgram() {
  return (
    <section className={`section ${styles.program}`} id="program" aria-labelledby="stage-title">
      <div className="container">
        <div className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>On-stage experiences</span>
            <h2 id="stage-title">Big ideas.<br />Real possibilities.<br /><span>Your next move.</span></h2>
            <p>Expert insights, global perspectives and a little friendly competition. Find your spark, then take it further.</p>
          </div>
          <div className={styles.pass}>
            <span className={styles.passLabel}>THE STAGE EDIT</span>
            <span className={styles.passNumber}>15<span>minute sessions</span></span>
            <div className={styles.passTags}><span>Talks</span><span>Demos</span><span>Games</span><span>Talent</span></div>
            <span className={styles.passFoot}>Learn something. Try something. Shine.</span>
          </div>
        </div>
        <div className={styles.notice}>
          <span className={styles.draft}>Proposed programme</span>
          <p>A preview of a possible festival day. All times and topics are illustrative; final dates, day-by-day sessions and speakers are TBA.</p>
        </div>
        <div className={styles.timelineGrid}>
          {blocks.map((block) => (
            <div key={block.label}>
              <div className={styles.blockHeading}>
                <span className={styles.blockLabel}>{block.label}</span>
                <h3>{block.title}</h3>
                <p>{block.period} <span>· Suggested times</span></p>
              </div>
              <ol className={styles.timeline}>
                {block.sessions.map(([time, end, type, tone, title, description]) => (
                  <li className={styles.entry} key={time}>
                    <div className={styles.time}><span>{time}</span><small>{end}</small></div>
                    <article className={styles.card}>
                      <span className={`${styles.category} ${styles[tone]}`}>{type}</span>
                      <h4>{title}</h4>
                      <p>{description}</p>
                      <div className={styles.speaker}><span className={styles.avatar} aria-hidden="true">?</span><span>Speaker / host <strong>TBA</strong></span><span className={styles.duration}>15 min</span></div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>More voices. More possibilities. The confirmed stage programme is coming soon.</p>
      </div>
    </section>
  );
}
