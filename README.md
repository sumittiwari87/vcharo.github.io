# VICHARO — विचार

> A thoughtful connector between ambitious mentees and senior domain experts.
> Built for Tier 2/3 India.

**Live (production):** https://mentor-connect-230.emergent.host
**Custom domain (planned):** vcharo.com

---

## 🧭 Project Overview

VICHARO is a two-sided mentor-mentee marketplace. This repo currently contains the
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
│   │   │   └── vicharo/     # landing sections (see below)
│   │   └── data/
│   │       └── vicharo.js   # static seed data (mentors, categories, ...)
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env                 # REACT_APP_BACKEND_URL
├── memory/
│   ├── PRD.md               # long-form product doc
│   └── test_credentials.md  # (empty — no auth yet)
└── README.md                # this file
```

### Landing sections (`/app/frontend/src/components/vicharo/`)

| File                    | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `Navbar.jsx`            | Sticky top nav, mobile drawer, `VICHARO विचार` wordmark   |
| `Hero.jsx`              | Split hero, dual CTAs, trust-stat strip, arch-top images  |
| `ProblemSolution.jsx`   | Two-card contrast: the problem vs the VICHARO answer      |
| `HowItWorks.jsx`        | Shadcn Tabs — Mentee (3 steps) / Mentor (3 steps)         |
| `Categories.jsx`        | Bento grid — 6 domains with Devanagari sub-labels         |
| `WhyVicharo.jsx`        | 4 value cards (verified, structured, accountable, ₹)      |
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

---

## 🕒 Pending / Roadmap

### Deployment & Domain (blocking public launch)
- [ ] Point custom domain **vcharo.com** to Emergent deployment (Entri DNS flow)
- [ ] Set up production monitoring / uptime check
- [ ] Add favicon + open-graph share image + meta tags for social previews
- [ ] SEO: title, meta description, sitemap.xml, robots.txt

### P0 — Core marketplace (next big module)
- [x] Mentor discovery / filter page (`/mentors`) — ✅ done Dec 13, 2025 (domain/price/language filters, search, sort, URL-synced, empty state)
- [x] Individual mentor profile page (`/mentors/:id`) — ✅ done Dec 13, 2025
- [ ] Mentee signup + Mentor onboarding auth flows
- [ ] Mentor application form + admin approval flow

### Ideas surfaced by testing/design agents (backlog)
- [ ] **Booking API refactor** — replace the `POST /api/waitlist` mock used inside `MentorProfile.jsx > requestBooking` with a real `POST /api/bookings` endpoint (fields: mentor_id, session_type_id, day, slot, mentee_email/id, price, status).
- [ ] **Split MentorProfile.jsx** — currently ~500 lines. Extract sub-components: `BookingWidget`, `ExperienceTimeline`, `ReviewsGrid`, `RelatedMentors` for easier future edits.
- [ ] **SEO on 404 / mentor profile** — add helmet `<meta name="robots" content="noindex">` on the mentor-not-found state; add per-mentor page title + og:image on profile pages.
- [ ] **Docs/tests must use real-domain example emails** — Pydantic `EmailStr` rejects reserved TLDs like `.test` / `.example`; use `@example.com` in demos.
- [ ] **"Save mentor" bookmark** on profile card — lead-magnet: capture email in exchange for saved list; typically +30% return-visit conversion.
- [ ] **Compare mentors** — pick 2–3 from discovery and side-by-side compare price / rating / expertise / availability.
- [ ] **Domain deep-links** — clicking a Featured Category on the landing page should route to `/mentors?domain=Technology` (already URL-supported, just needs the link wiring).

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
  -d '{"email":"demo@vicharo.in","role":"mentee"}'
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

_This README is the live source of truth for scope + status. It will be updated
after every feature, fix, or scope change._
