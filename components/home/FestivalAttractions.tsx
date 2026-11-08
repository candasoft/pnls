import graduation from "@/pics/icons/graduation-cap.png";
import presentation from "@/pics/icons/presentation.png";
import ability from "@/pics/icons/ability.png";
import learning from "@/pics/icons/online-learning.png";
import styles from "./festival-attractions.module.css";

const experiences = [
  { title: "Scholarships & Special Offers", label: "Find your next opportunity", icon: graduation.src, description: "Discover possible scholarships, course vouchers, fee discounts and education promotions from participating institutions." },
  { title: "Education & Career Talks", label: "Hear new perspectives", icon: presentation.src, description: "Learn from education experts, global study advisors and industry professionals." },
  { title: "Career Discovery", label: "Explore your direction", icon: ability.src, description: "Explore interests, potential career pathways and professional development opportunities." },
  { title: "EdTech & Innovation", label: "Experience what’s next", icon: learning.src, description: "Explore education technology, digital learning tools and innovation demonstrations." },
  { title: "Quizzes & Lucky Draws", label: "Make room for some fun", icon: "/icons/experiences/certificate.svg", description: "Join interactive festival activities, games and chances to win available prizes." },
  { title: "Student & School Tours", label: "Discover together", icon: "/icons/experiences/student.svg", description: "Learn together through proposed organized school and institutional group visits." },
];

export function FestivalAttractions() {
  return (
    <section className={styles.section} id="activities" aria-labelledby="experiences-title">
      <div className="container">
        <div className={styles.heading}>
          <div><span className="eyebrow">Festival experiences</span><h2 id="experiences-title">More Than<br /><span>an Exhibition.</span></h2></div>
          <div className={styles.intro}><span className={styles.date}>30–31 JANUARY 2027</span><p>Two days of learning, discovery, networking and memorable experiences designed to inspire every stage of your journey.</p></div>
        </div>
        <div className={styles.grid}>
          {experiences.map((experience, index) => (
            <article key={experience.title} className={`${styles.card} ${index === 0 ? styles.featured : index === 5 ? styles.tours : styles.regular}`}>
              <div className={styles.cardTop}><span className={styles.icon}><img src={experience.icon} width={64} height={64} alt="" loading="lazy" /></span><span className={styles.number} aria-hidden="true">0{index + 1}</span></div>
              <div className={styles.copy}><span className={styles.label}>{experience.label}</span><h3>{experience.title}</h3><p>{experience.description}</p></div>
              {index === 0 && <div className={styles.featureFoot}><span>Explore the possibilities</span><span aria-hidden="true">✦</span></div>}
              {index === 5 && <a className={styles.tourLink} href="/contact">Enquire about group visits <span aria-hidden="true">↗</span></a>}
            </article>
          ))}
        </div>
        <p className={styles.note}>Activity details, offers and prizes are subject to confirmation by the organizing team and participating institutions.</p>
      </div>
    </section>
  );
}
