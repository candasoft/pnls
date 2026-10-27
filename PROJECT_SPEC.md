# Pyinyar Lam Sone 2027 — Project Specification

Document date: 27 October 2026  
Status: Source-based product specification; requirements and commercial terms remain subject to confirmation.

## 1. Purpose and Source Status

Pyinyar Lam Sone (ပညာလမ်းဆုံ) Education & Career Pathways Festival 2027 is a physical and virtual platform connecting students, parents, educational institutions, service providers, and industry. Its core promise is **“One Place – Multiple Pathways.”** The website should help visitors discover, explore, plan, participate, and connect before, during, and after the event.

This specification consolidates the project’s existing sources. It does not establish a confirmed delivery schedule or imply that proposed services already exist.

| Status | Meaning |
| --- | --- |
| Implemented | Present in the supplied static homepage. |
| Source requirement | Requested in the website feature brief. |
| Proposed technology | Recommended in the technology document, not implemented in this repository. |
| Proposal context | Event plans, targets, packages, and milestones in the presentation. |
| Acceptance criterion | A verification condition derived for this specification; not evidence of completion. |
| Open decision | Incomplete or conflicting information requiring resolution before dependent implementation. |

### Source register

| Source | Use in this specification |
| --- | --- |
| [Essential website features](docs/Essential%20website%20features.docx) | Product capabilities, priorities, virtual booth features, and Myanmar visitor requirements. |
| [Tech Stacks](docs/Tech%20Stacks.docx) | Proposed application stack, infrastructure, storage, and email services. |
| [Event and sales proposal](docs/Pyinyar%20Lam%20Sone%20Edu%20Fair%202027.pptx) | Event identity, zones, targets, commercial packages, contacts, and preparation roadmap. |
| [Homepage prototype](index.html) | Current implementation, visual direction, public wording, and placeholder behavior. |
| [Project image assets](pics/) | Logos, posters, event concepts, floor layout, and design references. |

Use the feature brief for requested website behavior, the technology document for proposed stack choices, and the presentation for event and sales context. Use the homepage to describe current behavior. Record disagreements explicitly rather than silently treating one source as final approval.

## 2. Event Overview and Audiences

| Item | Source-based description |
| --- | --- |
| Event | Pyinyar Lam Sone Education & Career Pathways Festival 2027 (Yangon). |
| Dates | 30–31 January 2027. |
| Operating hours | 9:00 AM–5:00 PM each day, local Myanmar time (Asia/Rangoon). |
| Venue | Myanmar Expo Hall (Fortune Plaza), Thaketa Township, Yangon. |
| Organizer | MES — Marketing · Events · Solutions, as identified by the homepage. |
| Main contact | meseventservices@gmail.com. |
| Websites listed in sources | mesmyanmar.com and pyinyar.com. Production domain selection remains open. |
| On-site attendance target | 10,000+ visitors. |
| Online attendance target | 2,000+ visitors. |
| Booth planning target | 160+, matching the homepage and English sales proposal; other proposal slides state 150+. |

Targets are planning figures, not confirmed attendance or inventory. The presentation also sets a success framework of 1.2M+ digital impressions, 200+ institutional partners, and 5,000+ direct leads captured. Definitions and measurement methods remain to be agreed.

Primary audiences are students selecting education pathways, parents comparing options, graduates exploring employment, and professionals upgrading skills. Institutional audiences include schools, universities, colleges, training centers, overseas education agencies, supporting service providers, partners, and sponsors.

### Six education zones

| Zone | Coverage |
| --- | --- |
| Academic | Preschools, primary and secondary schools, GED, IGCSE, and A-Level academies. |
| Higher Education | Local private universities, colleges, business schools, and degree pathways. |
| Language | English, IELTS preparation, and other foreign languages. |
| Skill | Vocational and professional training, career skills, arts, entertainment, sports, engineering, medical, and seafaring pathways. |
| Overseas Education | Study abroad agencies, international universities, scholarships, and admissions guidance. |
| Education Services | IT devices, insurance, education finance, books and accessories, and travel support. |

The presentation uses “Overseas” and “Service”; the homepage expands these to “Overseas Education” and “Education Services.” This document uses the expanded names without asserting a final naming decision.

Event attractions in the proposal include scholarships and discounts, education and career discussions, career discovery, EdTech demonstrations, quizzes and lucky draws, and organized student tours. These are planned categories; confirmed activities, speakers, offers, and times must come from organizer-approved content.

## 3. Current Implementation

The supplied application consists of a single `index.html` file containing inline CSS, inline JavaScript, and embedded image data. There is no application framework configuration, backend, database implementation, authentication service, or functional ticketing system in the supplied project.

### Implemented homepage behavior

- Event date and venue top bar; sticky branded navigation; desktop and collapsible mobile navigation.
- Hero with registration and virtual exhibition calls to action, followed by festival target statistics.
- About section, six zone cards, attraction cards, virtual exhibition introduction, and exhibitor discovery promotion.
- Stage program categories, visitor planning information, partner placeholder, closing calls to action, and organizer contact footer.
- In-page anchor navigation, responsive grids, lazy loading on several content images, and a shared information modal.
- Modal closure through its close button, backdrop click, or Escape key. Mobile navigation updates its expanded state.
- Email links for exhibitor and partnership inquiries and external links to the organizer websites.

Registration, language switching, virtual exhibition entry, and detailed floor plan controls display informational notices. Zone links lead to visitor planning content rather than dedicated zone pages. The exhibitor section is promotional content, not a searchable directory. Program cards contain categories, not a confirmed timetable. Partner identities remain placeholders. No countdown is implemented.

### Visual direction and assets

The homepage establishes a navy, gold, and warm cream palette, Outfit headings, DM Sans body text, rounded cards, festival imagery, and responsive layouts. Fonts are requested from Google Fonts. The source includes a skip link, semantic landmarks, image alternatives, and selected ARIA attributes; these do not establish full accessibility compliance.

The `pics/` directory contains three logo files, organizer artwork, a poster, festival and fair imagery, a booth layout plan, a virtual education fair workspace reference, and a design reference image. Treat concept imagery and layout references as design inputs, not proof of confirmed venue assignments or participants. The prototype embeds images directly rather than loading these files as normal application assets.

## 4. Product Requirements and Acceptance Criteria

Priority labels below preserve the website feature brief. They do not assign release phases or delivery dates. All capabilities in this section are requested future behavior unless explicitly described as implemented in Section 3.

| Capability | Source priority | Required behavior | Acceptance criteria |
| --- | --- | --- | --- |
| Visitor registration and QR e-ticket | Essential | Short registration without mandatory account creation; collect student/parent status, education level, study interests, and preferred zones. Email a unique QR ticket with download or screenshot support. Support entrance check-in; family/group registration is optional, and walk-in registration is requested. | A visitor can register, receive a unique ticket, save it, and present it for check-in. Staff can register walk-ins and distinguish valid, invalid, and already-used tickets under the agreed entry policy. A saved screenshot can be presented without connectivity on the visitor’s phone. |
| Six zone landing pages | Essential | Each zone has a description, exhibitors, featured programs, zone sponsor, seminars, and booth locations. | Each zone can be opened directly, displays its relevant content, and links visitors to associated exhibitor profiles, sessions, and booth locations when published. |
| Searchable exhibitor directory | Essential | Individual profiles for the planned 160+ booths, with logo, description, zone, booth number, courses/services, contacts, and virtual booth links. Filter by zone, study destination, program type, and subject; save favorites. | Visitors can search and combine the specified filters, open matching profiles, save favorites, and see a clear empty state. Published physical and virtual information stays consistent. |
| Interactive floor plan | High impact | Show zones, booths, main stage, registration, food court, VIP and sponsor areas, restrooms, exits, and facilities. Search by exhibitor or booth number; open profiles from booths. | Searching locates the appropriate booth; selecting it opens the correct exhibitor. Published facility labels and booth assignments match the approved venue plan. |
| Stage and seminar schedule | Essential | Timetable for discussions, overseas education seminars, career talks, games, and other activities, with speakers, topics, locations, and live-stream links. | Visitors can distinguish sessions by event day and view published time, location, and speaker information. Available stream links open correctly; preliminary content is identified. |
| Virtual exhibition | Essential | Searchable digital booths with videos, brochures, courses, inquiries, chat, and meeting requests, subject to package entitlements. Share the physical exhibitor dataset. | Visitors can discover virtual booths and use their enabled features. Updates to shared exhibitor information appear consistently in both physical and virtual views. Package restrictions follow an approved entitlement matrix. |
| Consultation booking | High impact | Face-to-face or virtual appointments with providers, agencies, and counselors; available slots, confirmations, and reminders. | A visitor can select an available slot and receive confirmation. Conflicting reservations are prevented, and reminders follow the agreed schedule and channel configuration. |
| Education pathway finder | Differentiator | A short questionnaire using education level, career interests, budget range, and destination preferences to recommend zones, programs, seminars, and exhibitors. | Completing the questionnaire produces relevant recommendations linked to published content. Recommendation rules and sample outcomes are reviewed before release. |
| VIP and zone partner showcase | Essential | Dedicated partner profiles, premium logos, promotional banners, activities, and physical/virtual booth links. | Confirmed partners appear in their approved placements and link to the correct profiles, activities, and booths. Unconfirmed identities are not presented as confirmed. |
| Education resource and news center | Recommended | Articles, scholarships, application guides, opportunities, career guidance, updates, and post-event recordings. | Organizers can publish content, visitors can open it, and links to downloadable materials or recordings work when provided. |
| Exhibitor and organizer dashboards | Business critical | Exhibitors manage profiles, materials, consultations, and leads. Organizers monitor registrations, booth status, attendance, virtual engagement, and partner performance. | Exhibitors can manage their own permitted records. Organizers can view authorized operational information and reports. Access checks prevent unauthorized access to other exhibitors’ restricted data. |

### Additional source requirements

- Show a homepage countdown before the event starts. Define its behavior after the start time before implementation.
- Offer education program and scholarship discovery within the virtual experience.
- Provide exhibitor engagement statistics covering booth views, leads, bookings, and virtual interactions, with metric definitions agreed before reporting.
- Support consent-based lead capture through digital forms or QR scanning and digital brochure downloads.
- Make staff availability clear wherever chat or inquiry messaging is offered.
- Provide optional communication and sharing integrations where available: Viber, Telegram, SMS, Messenger, and Facebook sharing. The brief does not select providers or require every integration at launch.
- Potential digital sponsorship products include homepage banners, featured exhibitors, zone pages, seminar streams, floor plan branding, and pathway finder sponsorship. These are commercial opportunities, not approved launch commitments.

### Proposed public navigation

The feature brief lists: Register, Home, About Expo, Explore 6 Zones, Exhibitors, Floor Plan, Stage & Seminars, Virtual Expo, Visitor Guide, Sponsors, News & Updates, FAQ, and Contact Us.

Use desktop submenus where required and a compact mobile menu with prominent Register and Explore controls. Final route paths and the public “Sponsors” versus “Partners” naming remain open. No API endpoints or route contracts are established by the supplied sources.

## 5. Roles and Principal Workflows

| Role | Principal workflow and access boundary |
| --- | --- |
| Visitor | Discover zones and institutions → compare opportunities → register and save ticket → plan booths/sessions → attend physically or virtually → inquire or book consultations. Public browsing and initial registration must not require an account. Favorite persistence and booking identity rules remain open. |
| Exhibitor | Authenticate → update permitted profile and materials → review inquiries and leads → manage consultations → view engagement reports. Access is limited to authorized exhibitor records and package features. |
| Organizer | Authenticate → maintain event content, exhibitors, booths, programs, and partners → monitor registration and attendance → review engagement and reports. Exact permission groups remain to be defined. |
| Registration/check-in staff | Access an authorized check-in interface → scan tickets or register walk-ins → see entry results and record attendance. This is an operational role derived from the check-in requirement, not a separately specified dashboard in the brief. |

Physical profiles, virtual booths, zone pages, floor plan assignments, inquiries, and appointments should reference shared exhibitor information. The sources do not define database tables, API payloads, authentication contracts, or final permission matrices; these require implementation design after the open decisions are resolved.

## 6. Proposed Technical Direction

The technology document recommends the following stack. None of these services is implemented by the current static prototype.

| Component | Proposed choice |
| --- | --- |
| Website and dashboards | Next.js with TypeScript. |
| UI | Tailwind CSS and shadcn/ui. |
| Database | Self-hosted PostgreSQL. |
| Database access | Prisma. |
| Organizer/exhibitor authentication | Auth.js with application-level permissions. |
| Images and brochures | Server storage with separate backups. |
| Deployment | Docker Compose and Caddy for HTTPS. |
| Initial hosting | Vercel. |
| Email | Resend for QR tickets, inquiry notifications, and appointment confirmations. |

The initial Vercel hosting recommendation and the Docker Compose/Caddy recommendation need a defined deployment relationship. Before implementation, confirm where the application, PostgreSQL, and persistent files run; how uploads and backups persist; and how email jobs and reminders execute. Do not assume persistent local file storage on the initial application host.

Email delivery, media storage, QR issuance/scanning, live chat, live-stream hosting, and optional messaging require configuration or integration work. The supplied documents do not select implementations for all of them. No production infrastructure, credentials, domain ownership, or service provisioning is demonstrated by the project files.

## 7. Quality, Accessibility, and Data Handling

| Area | Requirement and verification |
| --- | --- |
| Language | Offer English and Myanmar content. Verify navigation, essential workflows, and Myanmar text rendering in both languages. Translation coverage and content ownership require confirmation; the current language button is a placeholder. |
| Mobile | Prioritize phone use, including registration, ticket display, directories, and floor plan navigation. Verify readable content and usable controls across phone, tablet, and desktop layouts. |
| Connection performance | Use lightweight pages and compressed images for slower connections. Evaluate the prototype’s embedded images and external font dependency during implementation; establish measurable performance budgets separately. |
| Accessibility | Provide readable text, keyboard-accessible navigation and dialogs, clear labels, and venue accessibility information. Test keyboard focus, dialog focus handling, contrast, and form errors; the prototype has only partial accessibility features. |
| Ticket access | A visitor can present a saved QR screenshot without internet on their device. This does not establish offline operation for staff scanning devices; scanner connectivity, synchronization, and fallback procedures remain open. |
| Security and permissions | Secure personal data and enforce application-level role permissions. Verify that unauthorized users cannot access dashboards, restricted leads, or another exhibitor’s protected records. |
| Consent and retention | Establish lead-sharing consent, permitted recipients, retention periods, and deletion procedures before personal data is distributed. Sales proposal benefits are not an approved access policy. |
| Reliability | Verify ticket, inquiry, and appointment email delivery and agreed failure recovery. Define backup and restore procedures for the selected database and file storage deployment. |
| Reporting | Agree metric definitions and collection methods before using reports to assess attendance, engagement, or sponsorship performance. Separate event targets from observed results. |

No formal accessibility conformance level, performance threshold, uptime target, or retention duration is specified in the sources. These must not be described as agreed commitments.

## 8. Commercial Context

All figures below are proposal terms requiring organizer confirmation. They are not a published checkout catalog or implemented payment workflow. One lakh is 100,000 MMK. The floor pricing slide explicitly labels prices in MMK lakhs; the zone partner detail slide has less explicit unit labeling, which should be confirmed before publication.

### Physical booths and partnership areas

| Package / source code | Size or designation | Proposed price (MMK lakhs) |
| --- | --- | --- |
| Premium (P) | 5 × 3 m | 40 |
| Service (V) | 4 × 3 m | 35 |
| Academic & Higher Education (A) | 3 × 3 m | 30 |
| Academic & Higher Education (B) | 3 × 3 m | 25 |
| Language (C) | 3 × 3 m | 25 |
| Skill (D) | 3 × 3 m | 25 |
| Overseas (F) | 3 × 3 m | 30 |
| Eco (E) | 2 × 3 m | 17 |
| Zone partner A / B / C | Partner areas | 150 / 180 / 150 |
| Zone partner D / E / F | Partner areas | 140 / 100 / 150 |
| VIP partner 1 / 2 / 3 | Partner areas | 250 each |

Booth codes and zone partner letters are reproduced from the proposal; their mapping to the six named education zones requires confirmation. The proposal offers a 5% discount for purchasing two Premium booths.

| Tier | Principal proposed benefits |
| --- | --- |
| VIP Partner | Preferred partner area, 15-minute seminar, 100% online/offline branding appearance, three dedicated social posts, prioritized Premium virtual booth, visitor listing/insights, and post-event report. Detailed slides also describe banners, stage branding, highlight video, announcements, and ceremony/press participation. |
| Zone Partner | Zone partner area, 15-minute seminar, 50% online/offline branding appearance, two dedicated social posts, prioritized Premium virtual booth, visitor listing/insights, and post-event report. Detailed slides add zone signage, highlight video, announcements, and media participation. |
| Premium Exhibitor | Main-aisle 5 × 3 m booth, one dedicated social post, Featured virtual booth, and post-event report. Visitor listing eligibility is stated for purchases of two booths or more. |

The overview and detailed slides differ in the specificity of speaking slots, announcements, and ceremony benefits. Final package wording and quantities must be approved before public sale or entitlement implementation.

### Add-ons and payment terms

| Proposed add-on | Price (MMK lakhs) |
| --- | --- |
| Speaker slot, 15 minutes | 3 |
| Online exhibitor / interactive virtual booth | 2.5 |
| Premium visitor data list | 1.5 |
| Banner placement, 6 × 3 ft, including installation | 2 |

The proposal describes an initial 50% payment and full payment before three weeks prior to the event. Confirm the operational due date and commercial terms separately. No online payment feature is specified in the website brief.

The visitor data add-on and package references to visitor listings must not be interpreted as permission to sell or expose all registration data. Consent, allowed fields, access, and sharing rules remain open.

### Virtual booth entitlements

| Source description | Stated features |
| --- | --- |
| Standard booth note | Name, address, logo, favorite control, one promotional image, and a smaller booth presentation. |
| General “Standard & Premium Booth” list | Exhibitor profiles, brochures, one promotional video, seven promotional images, favorites, chat or inquiries with staff availability, inquiry/meeting requests, program and scholarship discovery, and engagement statistics. |
| Sales proposal Premium virtual booth | Included for VIP and zone partners, with prioritized display in detailed package slides. |
| Sales proposal Featured virtual booth | Included for Premium physical exhibitors. |

The restrictive Standard note conflicts with the broader shared feature heading. The sources do not define Featured booth capabilities or whether the paid online exhibitor add-on is identical to the Premium entitlement. Approve a single package matrix before building access rules or sales pages.

## 9. Source Roadmap

These are event preparation milestones from the presentation, not a committed software release plan.

| Period | Proposed milestone |
| --- | --- |
| October 2026 | Stakeholder alignment, concept approval, partnership framework, and stakeholder mapping. |
| November–December 2026 | Exhibitor and sponsor recruitment, booth allocation, and sponsor packages. |
| December 2026 | Program planning, school/university outreach, tours, and speaker/session preparation. |
| January 2027 | Marketing, venue readiness, staff training, and event operations preparation. |
| 30–31 January 2027 | Festival delivery: exhibition, talks, tours, games, and scholarship/discount activities. |
| February 2027 | Impact reporting on attendance, participation, feedback, and outcomes. |

The sales roadmap also describes campaign launch two months before the event, increased promotion one month before, event-week media and setup, and post-event reports, lead delivery, and highlights. A website release sequence must be agreed independently from these event milestones.

## 10. Open Decisions and Delivery Boundaries

| Decision | Required resolution |
| --- | --- |
| Booth count and inventory | Reconcile 160+ versus 150+ planning targets and publish only approved inventory and assignments. |
| Hosting and persistent storage | Reconcile Vercel with Docker Compose/Caddy and self-hosted database/server storage recommendations; define backups and operational ownership. |
| Virtual packages | Confirm Standard, Premium, Featured, and paid virtual booth entitlements, including media limits, chat, statistics, and display prominence. |
| Commercial terms | Approve prices, units, package benefits, discount rules, availability, and payment deadlines before public display. |
| Personal data sharing | Define consent, eligible recipients, fields, export permissions, and retention before implementing listing or lead benefits. |
| Release priorities | Select launch capabilities and delivery dates; source priority labels alone do not establish a launch scope. |
| Content and language | Assign bilingual content owners; confirm public zone/partner names, FAQs, visitor guidance, and translation coverage. |
| Registration and entry | Confirm required fields, optional group registration, repeat-entry rules, scanner operation, and walk-in handling. |
| Visitor identity | Decide how favorites, bookings, and saved preferences persist without mandatory registration accounts. |
| Operational integrations | Select QR scanning, chat, streaming, reminder scheduling, and optional messaging implementations and owners. |
| Final event content | Obtain approved exhibitor/partner identities, booth map, session timetable, speakers, offers, and accessibility information. |
| Measurement | Define engagement events, report metrics, targets, and permitted analytics collection. |

This specification documents the intended product and current starting point. It does not introduce API endpoints, database schemas, confirmed participants, detailed session schedules, or software delivery commitments. Implementing the website, provisioning services, and publishing the site are separate work from producing this document.

## 11. Validation Checklist

### Specification review

- Confirm event facts and targets against the presentation and homepage, retaining conflict notes.
- Confirm feature coverage and priority labels against the website feature brief.
- Confirm proposed technology names against the technology document.
- Confirm commercial figures against presentation slides 6–11 and record entitlement ambiguities.
- Verify that every local source link resolves and that Myanmar text is preserved as UTF-8.
- Ensure implemented behavior is limited to what the supplied homepage actually provides.

### Future product acceptance scenarios

- Complete English and Myanmar visitor journeys on mobile and desktop, including registration, saved QR display, exhibitor discovery, and inquiry.
- Exercise valid, invalid, repeated, and walk-in check-in cases under the approved entry policy.
- Search exhibitors, combine filters, save favorites, and locate corresponding booths; verify empty results and unpublished content handling.
- Verify shared exhibitor updates across zone pages, directory, physical map links, and virtual booths.
- Verify each approved virtual package’s enabled and restricted features, media limits, and presentation.
- Book available consultations, attempt conflicting reservations, and verify confirmations and reminders.
- Check organizer, exhibitor, and check-in permissions with authorized and unauthorized users.
- Verify keyboard access, dialog focus, bilingual rendering, constrained-connection usability, email failure recovery, and backup restoration against agreed requirements.
- Verify reports against known registrations, check-ins, inquiries, bookings, and virtual interactions after metric definitions are approved.
