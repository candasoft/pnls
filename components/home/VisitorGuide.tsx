import { NoticeButton } from "@/components/notice-provider";

export function VisitorGuide() {
  return (
    <section className="section" id="plan">
      <div className="container info-banner">
        <div className="body">
          <span className="eyebrow" style={{ color: "#edc476" }}>
            Plan your visit
          </span>
          <h2>Everything You Need for a Great Festival Experience.</h2>
          <p>
            Discover six zones, the main stage, a food court, VIP and zone
            partner areas, and exhibitor booths across the planned exhibition
            hall.
          </p>
          <p>
            <strong style={{ color: "#f8d58d" }}>30–31 January 2027</strong>
            <br />
            9:00 AM – 5:00 PM
            <br />
            Myanmar Expo Hall (Fortune Plaza), Thaketa Township, Yangon
          </p>
          <NoticeButton
            className="btn btn-gold"
            message="The detailed booth map and assigned exhibitor locations will be published when finalized."
          >
            Explore the Floor Plan ↗
          </NoticeButton>
        </div>
        <img
          loading="lazy"
          src="/images/festival-hall.webp"
          alt="Illustration of education exhibition venue"
          width={1100}
          height={619}
        />
      </div>
    </section>
  );
}
