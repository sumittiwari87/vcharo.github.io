# Vcharo — विचार

> A thoughtful connector between ambitious mentees and senior domain experts.
> Built for Tier 2/3 India.

**Live (production):** https://mentor-connect-230.emergent.host
**Custom domain (planned):** vcharo.com

---

## 🧭 Project Overview

Vcharo is a two-sided mentor-mentee marketplace. This repo currently contains the
**public marketing landing page (v1)** with a working waitlist backend. Auth,
booking, payments, and dashboards are future modules.

---

## 🏗️ Tech Stack

| Layer      | Tech                                                              |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | React 19 (CRA + craco), Tailwind CSS, shadcn/ui, lucide-react     |
| Animations | Framer Motion (available), CSS transitions                        |
| Toasts     | `sonner`                                                          |
| Backend    | FastAPI (Python), Motor (async MongoDB driver), Pydantic v2       |
| Database   | MongoDB                                                           |
| Fonts      | Playfair Display (headings), Outfit (body), Rozha One (Devanagari)|
| Palette    | Navy `#0B132B`, Saffron `#F57A00`, Amber `#FFB238`, Paper `#FDFBF7`|

---

## 📁 Repo Structure

```
/app
├── backend/
│   ├── server.py            # FastAPI app, all routes under /api
│   ├── requirements.txt
│   └── .env                 # MONGO_URL, DB_NAME, CORS_ORIGINS
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.css        # fonts, theme tokens, paper noise, tactile buttons
│   │   ├── pages/
│   │   │   └── Landing.jsx  # composes the landing page
│   │   ├── components/
│   │   │   ├── ui/          # shadcn primitives (button, tabs, accordion, ...)
│   │   │   └── vcharo/     # landing sections (see below)
│   │   └── data/
│   │       └── vcharo.js   # static seed data (mentors, categories, ...)
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env                 # REACT_APP_BACKEND_URL
├── memory/
│   ├── PRD.md               # long-form product doc
│   └── test_credentials.md  # (empty — no auth yet)
└── README.md                # this file
```

### Landing sections (`/app/frontend/src/components/vcharo/`)

| File                    | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `Navbar.jsx`            | Sticky top nav, mobile drawer, `Vcharo विचार` wordmark   |
| `Hero.jsx`              | Split hero, dual CTAs, trust-stat strip, arch-top images  |
| `ProblemSolution.jsx`   | Two-card contrast: the problem vs the Vcharo answer      |
| `HowItWorks.jsx`        | Shadcn Tabs — Mentee (3 steps) / Mentor (3 steps)         |
| `Categories.jsx`        | Bento grid — 6 domains with Devanagari sub-labels         |
| `WhyVcharo.jsx`        | 4 value cards (verified, structured, accountable, ₹)      |
| `FeaturedMentors.jsx`   | Horizontal scroller — 4 mentors, prev/next controls       |
| `Testimonials.jsx`      | 3 mentee stories, middle card inverted                    |
| `ForMentors.jsx`        | Dark navy band pitching mentor benefits (6 perks)         |
| `Pricing.jsx`           | 3 plans — Single Session, Journey, Career Sprint          |
| `FAQ.jsx`               | Shadcn Accordion — 7 FAQs                                 |
| `CTABand.jsx`           | Waitlist form (email + mentee/mentor toggle) → API + toast|
| `Footer.jsx`            | 4-column footer + socials + legal                         |

---

## 🔌 Backend API

Base URL (dev): `${REACT_APP_BACKEND_URL}/api`

| Method | Path               | Purpose                                      |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/`                | Health check                                 |
| POST   | `/status`          | (Template) status check create               |
| GET    | `/status`          | (Template) list status checks                |
| POST   | `/waitlist`        | Join waitlist. Body: `{email, role, source}` |
| GET    | `/waitlist/count`  | Total waitlist entries                       |

### `POST /api/waitlist`
- Body: `{ "email": "you@example.com", "role": "mentee" | "mentor", "source": "landing" }`
- Deduplicates by email (idempotent → `already_registered: true`)
- Validates `role` (400 on bad value), email format (422 on bad email)
- MongoDB collection: `waitlist` — `{ id, email, role, source, created_at }`

---

## 🎨 Design System (highlights)

- **Editorial edtech** aesthetic with Indian identity accents (Devanagari `विचार`, `आगे`, `आज`, `पहचान`).
- **No** generic centered layouts or purple/violet gradients. Split heroes, bento grids, asymmetric composition.
- **Paper noise overlay** (SVG turbulence) sits above the page at 6% opacity.
- **Neo-brutalist buttons** — solid 2px navy border + 4px offset shadow (`.btn-tactile`).
- **Arch-top imagery** (`.arch-top`) as a subtle Indian architectural motif.
- All interactive elements carry `data-testid` attributes.

---

## ✅ What's Done (v1 — Dec 2025)

- [x] Full landing page (13 sections, fully responsive, mobile menu)
- [x] Functional waitlist backend (dedup + role validation)
- [x] Sonner toast on submit / duplicate
- [x] Static seed data for mentors, categories, testimonials, pricing, FAQs
- [x] Devanagari accent typography
- [x] `data-testid` on every interactive element
- [x] Testing agent iteration 1 — 100% backend & 100% frontend pass
- [x] Deployed to Emergent production
- [x] **Individual mentor profile page (`/mentors/:id`)** — hero (photo, verified badge, rating, location, response time, languages), bio, expertise list, career timeline (roles + education), booking widget (session-type picker, availability slots, sticky summary), reviews, related mentors carousel
- [x] Featured Mentors cards on landing → link to profile page (whole card is clickable, "View profile" CTA)
- [x] **Mentor discovery page (`/mentors`)** — 10 mentors, filter by domain / price bucket / language, keyword search, 4 sort orders, URL-synced filters (shareable), mobile filter drawer, empty state, results-count. Navbar `Mentors` and `Get Started` now route here.
- [x] **Global rename VICHARO → Vcharo** — folders (`components/vicharo/` → `vcharo/`), data files, imports, backend messages, docs. Only Devanagari accent `विचार` retained (it's the etymology).
- [x] **Dedicated `/how-it-works` page** — hero + track switcher (mentee/mentor, URL-synced `?track=mentor`), 5-step journey with under-the-hood callouts + Devanagari step numbers, trust/mechanics cards, session anatomy, pricing snapshot (reused), comparison table (vs Topmate / ADPList / free forums), FAQ, CTA band.
- [x] **Login dialog** (MOCKED auth) — shadcn Dialog opened from Navbar. Role picker → auth-method tabs (Email / Google / LinkedIn). Stores `{role, email, name}` in `localStorage` via `useSession()` hook.
- [x] **Mentee dashboard `/dashboard/mentee`** — editable profile (name, city, role, goal, domains, languages, budget, bio), resume upload (client-side), GitHub connect (mocked, pick up to 4 repos), matched mentors (client-side scored recommendation from the 10-mentor list), empty sessions state.
- [x] **Mentor dashboard `/dashboard/mentor`** — inline-editable public profile (title, tag, bio, expertise, session prices) that immediately reflects on `/mentors/:id`. Potential mentees (domain-matched), Current mentees, Incoming requests (Accept/Decline), Sent requests. Custom-price dialog enforces `offer ≤ public price`.
- [x] **Storage abstraction lib** — `session.js`, `mentorStore.js`, `menteeStore.js`, `requestsStore.js` all wrap `localStorage` behind an API-shaped interface so swapping to real backend is a one-file change.
- [x] **Dedicated `/pricing` page** — mentee/mentor track switcher (URL-synced `?side=mentor`), mentor economics (80/20 split, payout window, earnings table with 5 examples), "your money is safe" section (qualifies vs does-not-qualify for refund, evidence list), 3-step refund flow, 7-question payments FAQ, final CTA. Navbar Pricing now routes here.
- [x] **Dedicated `/about` page** — hero, our-story editorial, vision pull-quote + 4 vision bullets, 4 belief cards with Devanagari accents, traction stats, leadership row (Sushma Shukla · Sumit Kumar · Neeraj Kumar · Deepak Kumar), 6-person "also on the team" row (Praveen Kumar + 5 imaginary), 4-advisor strip, careers + press band, waitlist CTA. Navbar About now routes here.

---

## 🕒 Pending / Roadmap

### Deployment & Domain (blocking public launch)
- [ ] Point custom domain **vcharo.com** to Emergent deployment (Entri DNS flow)
- [ ] Set up production monitoring / uptime check
- [ ] Add favicon + open-graph share image + meta tags for social previews
- [ ] SEO: title, meta description, sitemap.xml, robots.txt

### P0 — Core marketplace (next big module)
- [x] Mentor discovery / filter page (`/mentors`) — ✅ done Dec 13, 2025
- [x] Individual mentor profile page (`/mentors/:id`) — ✅ done Dec 13, 2025
- [x] Mentee signup + Mentor onboarding auth flows — ✅ MOCKED (dummy localStorage session). Real Emergent Google Auth / JWT still pending.
- [ ] Real auth (Emergent-managed Google Auth or JWT) — replace the dummy `useSession` implementation
- [ ] Mentor application form + admin approval flow (verification queue)
- [ ] Real `POST /api/bookings` endpoint (replace waitlist mock inside `MentorProfile.jsx > requestBooking`)
- [ ] Real backend for mentee profile / mentor edits / requests / resume upload (swap out `localStorage`-backed stores)

### Ideas surfaced by testing/design agents (backlog)
- [ ] **Booking API refactor** — replace the `POST /api/waitlist` mock used inside `MentorProfile.jsx > requestBooking` with a real `POST /api/bookings` endpoint (fields: mentor_id, session_type_id, day, slot, mentee_email/id, price, status).
- [ ] **Split MentorProfile.jsx** — currently ~500 lines. Extract sub-components: `BookingWidget`, `ExperienceTimeline`, `ReviewsGrid`, `RelatedMentors` for easier future edits.
- [ ] **SEO on 404 / mentor profile** — add helmet `<meta name="robots" content="noindex">` on the mentor-not-found state; add per-mentor page title + og:image on profile pages.
- [ ] **Docs/tests must use real-domain example emails** — Pydantic `EmailStr` rejects reserved TLDs like `.test` / `.example`; use `@example.com` in demos.
- [ ] **"Save mentor" bookmark** on profile card — lead-magnet: capture email in exchange for saved list; typically +30% return-visit conversion.
- [ ] **Compare mentors** — pick 2–3 from discovery and side-by-side compare price / rating / expertise / availability.
- [ ] **Domain deep-links** — clicking a Featured Category on the landing page should route to `/mentors?domain=Technology` (already URL-supported, just needs the link wiring).
- [ ] **Namespace mobile-drawer testids** — `MentorDiscovery.jsx` renders the same `FilterPanel` JSX twice (sidebar + mobile drawer). At mobile viewports with the drawer open, every filter chip has two matching `data-testid` nodes. Fix by either (a) rendering only one panel based on breakpoint state, or (b) adding a `-mobile` suffix in the drawer scope. Also collapses the duplicate `name='price'` radio group.
- [ ] **Replace ternary side-effect in `toggle` helper** — `MentorDiscovery.jsx:39` uses `next.has(v) ? next.delete(v) : next.add(v);` (expression-statement). Convert to `if/else` — cleaner and passes stricter `no-unused-expressions` lint rules.
- [ ] **Tighten "Under ₹1,500" price bucket** — currently matches `< 1500`, which includes ₹1,499 (Aarav Menon). Decide intent — either keep as `< 1500` (current) or shift to `< 1400` to feel like a real budget bucket.
- [ ] **Error boundary at route level** — the `useNavigate is not defined` regression during dev showed the whole page crashed silently. Wrap each route in a small React error boundary that renders a "Something broke — go home" fallback.
- [ ] **Console/network logs in production** — add a lightweight client error reporter (Sentry / LogRocket free tier) so we catch these dev-only regressions in prod too.

### P0 — Booking & Payments
- [ ] Booking / calendar integration (Cal.com embed or custom)
- [ ] Razorpay payments (India) — session + subscription (Journey)
- [ ] Escrow release logic after session completion
- [ ] Refund flow if session doesn't happen

### P1 — Product depth
- [ ] Mentor dashboard: session notes, action items, progress tracker
- [ ] Mentee dashboard: journey doc, action items, streaks
- [ ] Verified credentials badge system (LinkedIn / employment check)
- [ ] Session recording upload + secure access
- [ ] Notifications (email + WhatsApp via Twilio/MSG91)

### P1 — Growth
- [ ] Newsletter/waitlist confirmation email (SendGrid or Resend)
- [ ] Lead-magnet PDF (career roadmap) gated behind waitlist email
- [ ] Landing-page A/B testing hooks (headline, CTA copy)
- [ ] Referral flow (mentee → mentee, mentor → mentee)

### P2 — Localization & Community
- [ ] Hindi (हिन्दी), Tamil (தமிழ்), Marathi (मराठी) UI toggle
- [ ] Mentor language filter tags
- [ ] Public "success stories" long-form blog

### Technical debt / polish
- [ ] Move hardcoded mentor data → MongoDB + `GET /api/mentors`
- [ ] Add error boundary at page level
- [ ] Image optimization + CDN
- [ ] Accessibility audit (axe / lighthouse)

---

## 🧪 Testing

- Testing reports: `/app/test_reports/iteration_*.json`
- Latest: **iteration_1.json** → backend 100%, frontend 100%

Retest a backend endpoint locally (dev):
```bash
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -s -X POST "$API/api/waitlist" -H "Content-Type: application/json" \
  -d '{"email":"demo@vcharo.in","role":"mentee"}'
```

---

## 🔐 Environment Variables

**Backend (`/app/backend/.env`)**
- `MONGO_URL` — Mongo connection string
- `DB_NAME` — database name
- `CORS_ORIGINS` — comma-separated origins (defaults to `*`)

**Frontend (`/app/frontend/.env`)**
- `REACT_APP_BACKEND_URL` — public URL of the FastAPI backend

> Never commit real production secrets. Emergent deploy injects env vars separately.

---

## 📝 Change Log

| Date       | Change                                                          |
| ---------- | --------------------------------------------------------------- |
| 2025-12-13 | v1 landing page live — 13 sections, waitlist API, testing green |
| 2025-12-13 | Added `/mentors/:id` profile page — hero, bio, expertise, career, booking widget, reviews, related mentors. Landing mentor cards now route to the profile. |
| 2025-12-13 | Added `/mentors` discovery page — 10 mentors, domain/price/language filters, search, sort, URL-synced filters, mobile drawer. Navbar links wired to route. Added agent-flagged improvement backlog to README. |
| 2025-12-13 | Testing iteration 3: 94% pass. Fixed testid regex for 'Data & AI' domain (via testing agent), cleaned duplicate Malayalam entries in language filter, normalised m1's language to devanagari-free `മലയാളം`. |
| 2025-12-13 | Appended all iteration-3 agent-surfaced ideas into the backlog: mobile-drawer testid namespacing, `toggle` helper refactor, price bucket tightening, route-level error boundaries, prod error reporting. |
| 2025-12-14 | Hard rename VICHARO → Vcharo across code + docs. Added `/how-it-works` page, login dialog (mocked), mentee dashboard, mentor dashboard. Introduced storage abstraction lib (`/src/lib/*`) so future backend swap is one-file change. |
| 2025-12-14 | Added `/pricing` page (mentee/mentor track, escrow story, refund evidence rules, 3-step refund flow, 7-Q FAQ) and `/about` page (story, vision, beliefs, leadership + team + advisors, careers/press band). Navbar Pricing and About now route to dedicated pages. Testing agent skipped per user instruction. |

_This README is the live source of truth for scope + status. It will be updated
after every feature, fix, or scope change._
