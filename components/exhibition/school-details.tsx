import type { MouseEvent } from "react";
import type { FloorBooth } from "./floor-data";

const courseSamples = {
  academic: [
    { name: "IGCSE Preparation", duration: "18–24 months", intake: "June & November" },
    { name: "GED Foundation", duration: "6–12 months", intake: "Monthly" },
    { name: "A-Level Pathway", duration: "18 months", intake: "June" },
  ],
  language: [
    { name: "IELTS Preparation", duration: "12 weeks", intake: "Monthly" },
    { name: "General English", duration: "16 weeks", intake: "Monthly" },
    { name: "Business Communication", duration: "8 weeks", intake: "January & July" },
  ],
  skill: [
    { name: "Digital Marketing Certificate", duration: "12 weeks", intake: "Monthly" },
    { name: "Web Development Diploma", duration: "9 months", intake: "January & June" },
    { name: "Professional Design", duration: "6 months", intake: "March & September" },
  ],
  overseas: [
    { name: "International Foundation", duration: "9–12 months", intake: "January & September" },
    { name: "Study Abroad Preparation", duration: "12 weeks", intake: "Monthly" },
    { name: "University Application Support", duration: "8 weeks", intake: "Year-round" },
  ],
  higher: [
    { name: "Diploma in Business Management", duration: "12 months", intake: "January & June" },
    { name: "Computing Foundation", duration: "9 months", intake: "March & September" },
    { name: "International Degree Pathway", duration: "3 years", intake: "September" },
  ],
};

export function SchoolDetails({ booth, onContact }: {
  booth: FloorBooth;
  onContact: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const category = booth.zone === "Academic" ? "academic" : booth.zone === "Language" ? "language" : booth.zone === "Skill" ? "skill" : booth.zone === "Overseas Education" ? "overseas" : "higher";
  const courses = courseSamples[category];

  return <div className="vb-about">
    <span className="vb-school-demo">DUMMY SCHOOL DETAILS</span>
    <p>{booth.name} is presented here as a student-focused education provider in Yangon, helping learners build academic confidence and practical skills through small classes, experienced teachers and individual study guidance.</p>
    <div className="vb-school-stats"><div><strong>2014</strong><span>Established</span></div><div><strong>1,200+</strong><span>Students</span></div><div><strong>20:1</strong><span>Class ratio</span></div></div>

    <h4>Programs &amp; upcoming intakes</h4>
    <div className="vb-school-courses">{courses.map((course) => <article key={course.name}><h5>{course.name}</h5><p>{course.duration}<span aria-hidden="true"> · </span>Intakes: {course.intake}</p></article>)}</div>

    <h4>Campus &amp; learning</h4>
    <dl>
      <div><dt>Campus address</dt><dd>{booth.address || "Learning Campus, Kamayut Township, Yangon (demo)"}</dd></div>
      <div><dt>Study options</dt><dd>On campus &amp; blended learning</dd></div>
      <div><dt>Teaching languages</dt><dd>English &amp; Myanmar</dd></div>
      <div><dt>Student support</dt><dd>Academic mentoring, career guidance &amp; application support</dd></div>
    </dl>

    <h4>Admissions &amp; scholarships</h4>
    <p>Applications include an education history review and a short placement interview. Foundation routes are available for learners who need extra preparation.</p>
    <div className="vb-school-offer"><strong>Sample merit scholarship</strong><p>Up to 25% of tuition for eligible applicants, with installment options. Illustrative offer for this demo.</p></div>
    <dl><div><dt>Consultation hours (demo)</dt><dd>Monday–Saturday, 9 AM–5 PM</dd></div><div><dt>Meet us at the festival</dt><dd>Booth {booth.id}<br />30–31 January 2027</dd></div></dl>

    <p className="vb-info-note">All school statistics, courses, campus details and offers above are dummy data for this preview.</p>
    <button type="button" className="btn btn-gold" onClick={onContact}>Ask about admissions ↗</button>
  </div>;
}
