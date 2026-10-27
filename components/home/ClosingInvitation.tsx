import { NoticeButton } from "@/components/notice-provider";

export function ClosingInvitation() {
  return (
    <section className="cta">
      <div className="container">
        <span className="eyebrow" style={{ color: "#e9c47a" }}>
          Your future starts here
        </span>
        <h2>Your Next Opportunity Could Change Everything.</h2>
        <p>
          The right education. The right skills. The right connections.
          <br />
          Discover them at Pyinyar Lam Sone 2027.
        </p>
        <NoticeButton
          className="btn btn-gold"
          message="Online visitor registration is being prepared. Please check back for registration updates."
        >
          Register for the Festival ↗
        </NoticeButton>
        <a
          className="btn btn-light"
          href="mailto:meseventservices@gmail.com?subject=Pyinyar%20Lam%20Sone%202027%20Exhibitor%20Enquiry"
        >
          Become an Exhibitor →
        </a>
      </div>
    </section>
  );
}
