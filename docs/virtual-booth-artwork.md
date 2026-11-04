# Virtual booth interior

Created with the built-in imagegen tool. The supplied `vbooth.jpg` was used as design inspiration for the navy-and-gold booth treatment, not as an edit target. School branding, screen content, speech bubble, signs and downloadable documents are live HTML controls layered over the artwork.

Asset: `public/images/virtual-booth-interior.webp` — 1536 × 1024, WebP quality 88, approximately 168 KB.

## Final generation prompt

Use case: stylized-concept. Asset type: landscape background artwork for a functional interactive virtual education exhibition booth, 1536x1024 landscape composition. Create a photorealistic premium architectural 3D render of ONE complete front-facing education booth inside a dim exhibition hall, camera at visitor eye level, wide symmetrical composition, all of booth visible. Dark midnight navy matte walls, champagne gold illuminated trim, warm flattering light, polished neutral stone floor and discreet ceiling trusses. Large curved navy canopy across the top; keep the wide central front fascia entirely blank smooth navy, reserved for school name overlay. Back wall has elegant fine vertical warm gold illuminated lines. On LEFT wall reserve a large wide flat front-facing blank black rectangular video screen from approx 12% to 47% of image width and 38% to 62% of image height; screen is easy to overlay with functional HTML video, minimal perspective, no words or graphics. A beautiful curved navy reception desk with thin luminous gold edges spans center-right from 37% to 88% width, top surface at 72% image height, desk front down to 88%, leave the top surface clear for clickable document overlays. Behind desk on RIGHT, at approximately 78% width, a friendly professional Southeast Asian female education adviser in a cream blazer with navy blouse, waist-up, welcoming expression, visible from 48% to 73% image height; she should look like a real human, hands resting naturally on desk, no gesture signs, no speech bubbles (HTML will add). Leave clean wall space left of her head around 62% width, 43% height for HTML speech bubble. Gold lighting in the floor traces the booth perimeter. Rich navy and warm gold color palette, elegant education fair mood, premium convincing materials, realistic depth and dramatic soft lighting. No Cisco branding, no brand logos, no readable text, no letters, no printed documents, no UI controls or labels, no watermarks. This must be a real booth scene, not an image of a website or UI mockup.

## Content and interaction notes

- The booth background and representative are illustrative, not a confirmed venue or staff member.
- The canopy and counter show the selected school name dynamically.
- Desk documents download preview planning guides until `brochureUrl` is supplied on the shared booth record.
- The wall plays a supplied `videoUrl` in a native video element with controls. Missing or failed videos show an explanatory state on the wall screen.
- The contact bubble opens an enquiry form. Where no school email is supplied, the email draft is addressed to the existing organizer contact. Nothing is sent automatically.
- School favorites retain their existing browser storage key.
