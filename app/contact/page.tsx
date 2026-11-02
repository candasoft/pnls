import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "./contact-form";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Pyinyar Lam Sone 2027",
  description: "Contact the Pyinyar Lam Sone 2027 organizers for visitor registration, exhibiting, sponsorship, media, school group visits, and technical support.",
};

const contacts = [
  ["Min Htun Oo", "09 961172232", "+959961172232"],
  ["Chaw Su", "09 5013646", "+9595013646"],
  ["Khant Soe Htet", "09 250000110", "+959250000110"],
  ["Chaw Kalyar", "09 257239752", "+959257239752"],
];

export default function ContactPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <Header contact />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact Us</span>
            </nav>
            <div className={styles.heroHeading}>
              <div><span className="eyebrow">Contact Us</span><h1 id="contact-title">Let's Connect. <span>Let's Build Opportunities Together.</span></h1></div>
              <p>Whether you're planning to visit, interested in exhibiting, exploring partnership opportunities, or looking for additional event information, our organizing team is here to help.</p>
            </div>
          </div>
        </section>
        <section className={styles.contactSection} aria-labelledby="inquiry-title">
          <div className={`container ${styles.contactGrid}`}>
            <aside className={styles.team} aria-labelledby="team-title">
              <div className={styles.envelope} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="12" width="38" height="27" rx="4" /><path d="m6 14 18 14 18-14M6 37l12-12m24 12L30 25M24 3v4M9 5l3 4m27-4-3 4" /></svg></div>
              <h2 id="team-title">Contact the organizers</h2>
              <p>MES – Marketing • Events • Solutions</p>
              <div className={styles.teamDetail}><span>Email</span><a href="mailto:meseventservices@gmail.com">meseventservices@gmail.com <span aria-hidden="true">↗</span></a></div>
              <div className={styles.teamDetail}><span>Event Contact Persons</span><ul className={styles.contactPeople}>{contacts.map(([name, phone, tel]) => <li key={tel}><span>{name}</span><a href={`tel:${tel}`}>{phone}</a></li>)}</ul></div>
              <div className={styles.teamDetail}><span>Organizer Office</span><address>No. (43)B, 4th Street, Lanmadaw Township, Yangon</address></div>
              <div className={styles.teamDetail}><span>Websites</span><div className={styles.websites}><a href="https://www.mesmyanmar.com" target="_blank" rel="noopener noreferrer">www.mesmyanmar.com ↗</a><a href="https://www.pyinyar.com" target="_blank" rel="noopener noreferrer">www.pyinyar.com ↗</a></div></div>
            </aside>
            <div className={styles.formPanel}>
              <span className="eyebrow">Send an enquiry</span>
              <h2 id="inquiry-title">How Can We Help You?</h2>
              <ContactForm />
            </div>
          </div>
        </section>
        <section className={styles.visit} aria-labelledby="visit-title">
          <div className={`container ${styles.visitInner}`}>
            <div>
              <h2 id="visit-title">Visit the festival</h2>
              <iframe
                className={styles.venueMap}
                title="Google Map of Myanmar Expo Hall (Fortune Plaza), Yangon"
                src="https://www.google.com/maps?q=Myanmar+Expo+Hall+Fortune+Plaza+Yangon&output=embed"
                width="600"
                height="340"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className={styles.eventDetails}>
              <div><span className={styles.detailNumber} aria-hidden="true">01</span><div><h3>The venue</h3><p>Myanmar Expo Hall (Fortune Plaza)<br />Thaketa Township, Yangon</p></div></div>
              <div><span className={styles.detailNumber} aria-hidden="true">02</span><div><h3>Save the dates</h3><p>30–31 January 2027 | 9:00 AM – 5:00 PM</p></div></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
