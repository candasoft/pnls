import { NoticeButton } from "@/components/notice-provider";

export function VirtualExhibition() {
  return (
    <section className="section showcase" id="virtual">
      <div className="container showcase-grid">
        <div>
          <span className="eyebrow">Digital experience</span>
          <h2>Your Future Is Still Within Reach—Wherever You Are.</h2>
          <p>
            Can't attend in person? Explore education opportunities through the
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
          <NoticeButton
            className="btn btn-gold"
            message="Virtual booth access will be activated as participating institutions complete their profiles."
          >
            Enter Virtual Exhibition ↗
          </NoticeButton>
        </div>
        <img
          loading="lazy"
          src="/images/virtual-expo.webp"
          alt="Concept visual showing the virtual education exhibition platform and remote participation"
          width={1050}
          height={591}
        />
      </div>
    </section>
  );
}
