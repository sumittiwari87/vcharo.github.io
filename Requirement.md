# Vcharo — Requirements Document

_Compiled from every instruction given by the user across the build sessions._
_Format: chronological, grouped by phase. This is the running spec._

---

## Original PRD (Session 1)

**App:** Vcharo (originally VICHARO — user-facing name is being renamed to "Vcharo" in this phase).
**Type:** Web-based, mobile-first, responsive marketing landing page for a two-sided mentor-mentee marketplace.

### Target Users
- **Primary:** Aspiring professionals & students from Tier 2/3 Indian cities looking for accessible, structured mentorship.
- **Secondary:** Senior professionals & domain experts wanting to monetize expertise and build a verifiable mentoring portfolio.

### Home page — required sections
1. Navbar — Logo (Vcharo), links (How it works, Mentors, Pricing, About), Login, "Get Started" CTA
2. Hero — headline "Mentorship that moves careers forward", dual CTAs (Find a Mentor / Become a Mentor), trust stats strip
3. Problem → Solution strip
4. How It Works — 3-step visual flow for both mentees and mentors (tabbed)
5. Featured Mentor Categories — Tech, Product, Design, Finance, Consulting, Data
6. Why Vcharo — 4 value props
7. Featured Mentors carousel
8. Success Stories / Testimonials
9. For Mentors section
10. Pricing snapshot
11. FAQ (6–8 questions)
12. Final CTA band
13. Footer

### User flows
- Land → hero → "Find a Mentor" → mentee signup; OR "Become a Mentor" → mentor onboarding
- Secondary path: How it Works → Featured Mentors → CTA

### Design direction
- Modern edtech aesthetic with an Indian identity accent
- Palette: deep indigo/navy + warm saffron/amber + soft off-white
- Typography: clean sans-serif body, serif/display for wordmark, Devanagari accent for "विचार"
- Rounded cards, generous whitespace, subtle gradients
- Fully responsive (mobile → tablet → desktop)
- Accessibility: WCAG AA contrast, semantic HTML, keyboard-friendly

### Constraints & user choices (Session 1)
- **Newsletter/waitlist backend:** simple functional endpoint (no email confirmation)
- **Mentor data:** hardcoded static in frontend for v1
- **Design theme:** design agent to explore a distinctive Indian-edtech aesthetic (not just PRD palette)
- **Language stack:** JavaScript (not TypeScript, despite PRD suggesting TS)

### Assumptions carried from PRD
- v1 is static/marketing only — real auth, booking, dashboards come later
- Mentor and testimonial data is placeholder / seed
- English-first, structure ready for Hindi localization later
- Newsletter/waitlist form connects to a simple FastAPI + MongoDB endpoint

### Future improvements listed in PRD
- Full mentor discovery + filter page
- Booking + calendar integration (Cal.com or custom)
- Payments (Razorpay for India, Stripe for global)
- Mentor dashboard with session notes, action items, progress tracking
- Verified credentials badge system
- Hindi + regional language support

---

## Session 2 — Individual Mentor Profile Page

**Requirement:** Implement individual mentor profile page at `/mentors/:id`.

**Must show:**
- Profession / current title
- Education background
- How many mentees / sessions they have mentored
- What mentees say about the mentor (reviews)
- Areas of expertise
- "and many more if you think of" — user delegated design of extra sections

**Wiring:**
- Link this page from the Featured Mentors list on the main page
- Clicking a mentor card opens their profile

**Delivered:** rich profile page with hero (photo, verified badge, rating, location, response time, languages), bio, expertise list, career timeline (roles + education), booking widget (session-type picker, availability slots, sticky summary), reviews grid, related-mentors carousel.

---

## Session 3 — Mentor Discovery Page

**Requirement:** Mentor discovery / filter page at `/mentors` listing all mentors with:
- Domain filter
- Price filter
- Language filter

**Delivered:** discovery page with keyword search, 6 domain chips, 4 price buckets, 8 language chips, 4 sort orders, URL-synced filter state (shareable), mobile filter drawer, empty-state, results-count. Mentor roster expanded from 4 → 10.

---

## Session 4 — Documentation & Deployment

**Requirement:**
- Add all agent-surfaced ideas (from testing reports) into `README.md`
- Deploy the app to production

**Delivered:**
- README backlog updated with 11 agent-flagged improvement ideas (booking API refactor, split `MentorProfile.jsx`, SEO 404, save-mentor bookmark, compare mentors, domain deep-links, mobile-drawer testid namespacing, `toggle` helper refactor, price bucket tightening, route-level error boundaries, prod error reporting).
- Deployment guidance provided via support (main agent cannot deploy directly). User successfully deployed; production live at `https://mentor-connect-230.emergent.host` and now `https://vcharo.com`.

---

## Session 5 — Current Ask (this session)

### 5A. Naming
- **Global rename:** `VICHARO` → `Vcharo` across all user-facing copy (logos, headings, body text, meta, footer, share strings, README, PRD, this file).
- Internal identifiers (folder names like `/components/vicharo/`, CSS classes, `data-testid` values) may remain as `vicharo` to avoid breaking git history and referential integrity; only display strings change. **(To confirm before implementation.)**

### 5B. Dedicated "How it works" page
- New route `/how-it-works` — deeper than the landing-page section.
- Nav bar "How it works" now points to this route (landing anchor `/#how-it-works` preserved as a shortcut).
- Track switcher (Mentee / Mentor) that also URL-syncs (`?track=mentor`).
- Sections:
  1. Hero with track switcher
  2. 5-step detailed journey (per track) with under-the-hood callouts
  3. Trust & mechanics — escrow, verification, refunds, cancellation rules
  4. Session anatomy — before / during / after
  5. Pricing snapshot (reuse component)
  6. Comparison table — Vcharo vs Topmate / ADPList / free forums
  7. FAQ subset (reused component)
  8. Final CTA band (reused)
- Devanagari accents on step numbers (एक, दो, तीन…).
- Sticky sub-nav with scroll-spy on desktop.
- Data-testids on every element.

### 5C. Login flow (dummy for now — real auth deferred)
- Clicking "Login" (Navbar) opens a **login dialog** (shadcn Dialog).
- Dialog asks role first: **[I'm a Mentor] [I'm a Mentee]**.
- After role, show tabs: **[Email + Password] | [Google] | [LinkedIn]**.
- Email/Password: form with email + password fields.
- Social buttons: styled real buttons but on click just simulate a successful login (dummy).
- On successful login (any path):
  - Store role + email in `localStorage` (dummy session).
  - Redirect to `/dashboard/mentee` or `/dashboard/mentor`.
- No real auth integration in this pass — flagged as "MOCKED" until Emergent Google Auth / JWT is wired in a later session.

### 5D. Mentee dashboard (`/dashboard/mentee`)
- Layout: sidebar + main content.
- **Profile section** — all data a mentor would need to work on this mentee:
  - Name, city, current role / student status, target role / goal
  - Preferred domains, preferred languages, budget range
  - Bio / short pitch ("what I want to get out of mentorship")
  - Availability windows
- **Resume upload** — file upload input, stores metadata client-side (dummy), shows uploaded filename and lets the user replace/delete.
- **GitHub connect** — button that (dummy) simulates OAuth and then lets the mentee pick which repos to showcase on their home. Selected repos render as cards with name, description, language, stars, last-updated.
- **Matched mentors section** — from the mentee's declared domain / budget / language, show 3 recommended mentors from the existing static mentor list (client-side filter).
- **Session history / journey doc** — placeholder empty state ("No sessions yet — book your first").

### 5E. Mentor dashboard (`/dashboard/mentor`)
- Layout: sidebar + main content.
- **Editable profile** — all fields on the public `/mentors/:id` page (bio, title, expertise, session types, availability, price) are editable via an inline edit modal. Save button persists to `localStorage` (dummy). Public profile then reflects the edits.
- **Potential mentees** — a list of mentees whose profile matches the mentor's domain (from a small mocked mentee dataset). Card shows mentee summary + "Send request" CTA.
- **Current mentees** — active mentees the mentor is currently working with (mocked list). Card shows session count, next session, quick-open journey doc.
- **Requests received** — mentees who requested to book / connect with this mentor. Accept / Decline actions.
- **Requests sent** — mentor can send a connect request to a "potential mentee" and set a **custom price** (equal to or lower than their public session price — never higher). Mentee cannot edit this. Card shows status (pending / accepted / declined).
- All actions update local dummy state and toast for confirmation.

### 5F. Deliverables for this session (documentation phase)
- `Requirement.md` (this file) — created.
- Full plan outlined in chat (no code yet, per user request).
- `README.md` — updated with the new scope after the user says "implement".

---

## Cross-cutting constraints

- Stack stays: React (JS) + FastAPI + MongoDB.
- All new backend routes prefixed with `/api`.
- All interactive elements carry `data-testid`.
- No visual regressions on existing pages.
- Design continues in the same paper/navy/saffron + Devanagari accent system.
- Every completed feature is verified via `testing_agent_v3` before finish.
- README is updated after every feature (done for sessions 1–4; will continue).

---

## Confirmed rejections / non-goals for v1

- No real payment integration yet (Razorpay deferred).
- No real calendar / booking (Cal.com deferred).
- No email confirmation on waitlist yet.
- No Hindi / regional-language UI toggle yet (structure only).
- No verified badge system (visual badge only, no real credential check yet).
- No mobile native app.
