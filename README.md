# Pyinyar Lam Sone 2027

Festival website built with Next.js App Router, React, and TypeScript. The first implementation covers the home page and follows `index prototype.html` and `PROJECT_SPEC.md`.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. On Windows PowerShell with restricted execution policy, use `npm.cmd` instead of `npm`.

```sh
npm run typecheck
npm run build
npm start
```

## Structure

- `app/page.tsx`: home page composition.
- `components/home/`: individual festival sections.
- `components/header.tsx`: responsive navigation and active section tracking.
- `components/countdown.tsx`: countdown to 30 January 2027, 9 AM Myanmar time; festival and post-event messages follow automatically.
- `components/notice-provider.tsx`: shared native dialog with keyboard handling, focus containment and focus restoration.
- `app/globals.css`: prototype styles; `app/refinements.css`: application and responsive refinements.
- `public/images/`: extracted, deduplicated prototype artwork. Original reference files and source artwork remain in the workspace.

## Current boundaries

Registration, Myanmar translation, virtual exhibition access and the assigned floor plan display availability notices. No visitor data is collected. Exhibitor and partner inquiries link to the organizer's email address. Targets and planned activities retain their preliminary wording; there are no invented exhibitors, confirmed partners or session times.

The layout uses Google Fonts with system font fallbacks. No database, authentication, email service, hosting account or environment variables are needed for this home page. Future features should follow the technical direction and open decisions in `PROJECT_SPEC.md`.
