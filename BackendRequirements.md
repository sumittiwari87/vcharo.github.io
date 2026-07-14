# Vcharo — Backend & Onboarding Requirements

> Advisory document. No code changes derive from this file directly. Reflects the
> architecture direction agreed with the founders on 2025-12-14.

---

## Part 1 — Onboarding UX

### Current state
- `Login` and `Get Started` both open the same `LoginDialog`. That's wrong for
  `Get Started` — new users need a real onboarding flow, not a login prompt.
- The waitlist form on the landing page is a lead-capture, not the same thing
  as onboarding.

### Proposed flow

#### `Get Started` → new route `/get-started`
Single **Role picker** page:
- Big tile "I'm a Mentee" → `/onboarding/mentee`
- Big tile "I'm a Mentor" → `/onboarding/mentor`

#### `/onboarding/mentee` — 4-step wizard (progress bar top)

| Step | What                                                                       | Why                                                        |
| ---- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | **Sign up / verify identity** — Google OAuth **or** LinkedIn OAuth, email/password fallback | Creates the account + first identity signal.               |
| 2    | **Basics** — name (auto-filled from OAuth), city, current role / student status, target goal | 1 screen, ~60 seconds. Zero pain to complete.              |
| 3    | **Preferences** — preferred domains, languages, budget/session, availability | Same fields as the mentee dashboard. Feeds into matching.  |
| 4    | **Optional bonuses** — resume upload, GitHub connect, short bio (skippable) | Doesn't block signup, but boosts match quality.            |

On finish → land on `/dashboard/mentee` with all data pre-filled and a "First
mentor picks" widget already populated from the answers.

#### `/onboarding/mentor` — 5-step wizard

| Step | What                                                       | Why                                                             |
| ---- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| 1    | **Sign up / verify identity** — Google + LinkedIn (LinkedIn strongly encouraged) | Needed downstream for employment verification.                  |
| 2    | **Public profile** — title, current company, domain, city, tag, bio         | What mentees see on `/mentors/:id`.                             |
| 3    | **Expertise & session types** — multi-select expertise, per-session prices, free 15-min intro toggle | The economic contract with the platform.                        |
| 4    | **Availability** — weekly slots picker                     | Powers the booking widget.                                      |
| 5    | **Application review** — "under review, 5 working days" screen | Mentor is listed **but hidden** until Trust team approves.      |

Verified badge unlocks on approval.

### Verified badges — the plan

Three separate badges. All visible on `/mentors/:id` and dashboards.

| Badge                | What it verifies                              | How it's earned                                                                                        |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🟦 **Identity Verified** | This is a real person, name matches           | Successful Google **or** LinkedIn OAuth                                                                |
| 🔗 **LinkedIn Verified** | Employment claim matches LinkedIn             | LinkedIn OAuth returned a current employer that matches the "current company" field                    |
| 🏢 **Company Verified**  | Actively working at a claimed employer        | Domain-matched work email (e.g. `user@razorpay.com`) OR HR letter uploaded + manually approved         |

Store as an array on the user record:

```json
{ "verified_badges": ["identity", "linkedin", "company"] }
```

Display coloured pill badges on cards + a "how verified" tooltip. Mentees can
earn **Identity Verified only**; the other two are mentor-only.

### `Login` stays exactly as it is
Dialog with role picker → email / Google / LinkedIn. It's for **returning
users**, which is a different intent from new signups.

### New files needed (heads-up, not yet built)

- `/pages/GetStarted.jsx` — role picker
- `/pages/OnboardingMentee.jsx` + `/pages/OnboardingMentor.jsx` — wizards
- `/components/vcharo/onboarding/StepIndicator.jsx`
- Backend: `POST /api/onboarding/mentee`, `POST /api/onboarding/mentor`, `GET /api/user/verifications`

---

## Part 2 — Backend Architecture

### Two important truths first

1. **You do NOT need microservices for a long time.** Netflix, Uber, and Airbnb
   all started as monoliths. Microservices are a scaling solution, not a
   starting point. They add roughly 3x operational cost (deploy pipelines,
   service mesh, observability, cross-service auth, distributed tracing) for
   zero user benefit until you have >50 engineers or >10M requests/day. Vcharo
   is nowhere near that. **Recommendation: modular monolith now, extract
   services later when a specific module actually hurts.**

2. **Multiple languages ≠ better.** Polyglot backends *sound* engineering-mature
   but the reality is: you double your hiring pool problem, your library
   ecosystem, your monitoring stack, and your CI complexity. Pick a second
   language only when there's a *real* reason (e.g., a critical Go service for
   100k RPS websockets that Python can't handle). **Recommendation: one primary
   language (Python), sprinkle a second only if forced.**

### Recommended stack

#### The core (one FastAPI app for now)

| Concern                                     | Choice                                | Why                                                                                                                            |
| ------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **API layer**                               | **FastAPI (Python)**                  | Async by default, best-in-class OpenAPI, native Pydantic validation, huge ecosystem for payments/LLMs/OAuth. Same as today.    |
| **User + auth + orders + transactions**     | **PostgreSQL** (add)                  | Users, verifications, orders, transactions, refund cases → relational, ACID, audit trail. Use SQLAlchemy 2.x async.            |
| **Mentor / mentee profiles + journey docs** | **MongoDB** (existing)                | Semi-structured (expertise lists, availability, journey docs), schema evolves quickly. Keep it.                                |
| **Sessions cache + rate limits + pubsub**   | **Redis** (add)                       | Session tokens, presence, notification fan-out.                                                                                |
| **Object storage (resume, ID, recordings)** | **Cloudflare R2** or **AWS S3**       | S3-compatible. R2 has cheap egress.                                                                                            |
| **Search (mentors by domain/lang/etc.)**    | Postgres + trigram index first; Meilisearch if needed | Don't reach for Elasticsearch too early.                                                                                       |
| **Background jobs (payouts, email, verification queue)** | **Celery** (Python) + Redis broker | Same language as your API. Cron via Celery beat.                                                                               |

#### Domain-specific integrations (buy, don't build)

| Concern                              | Vendor                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------- |
| **Payments + escrow + refunds**      | **Razorpay** (India-first, UPI, EMI, Payouts API for mentor NEFT). Stripe Connect if global. |
| **KYC / ID verification**            | **Digio** or **Signzy** (India), or **Persona** (global)                  |
| **Video calls / live streaming**     | **Daily.co** or **100ms** (Indian company, WebRTC, recording built-in). Zoom SDK if enterprise. **Never build WebRTC in-house — it's a career, not a feature.** |
| **Email (waitlist, receipts)**       | **Resend** or **SendGrid**                                                |
| **SMS / WhatsApp**                   | **MSG91** (India-first) or **Twilio**                                     |
| **LLM (profile gen, matching, session summaries)** | **Emergent LLM key** — single key across GPT / Claude / Gemini            |
| **File uploads**                     | Cloudflare R2 signed URLs (client uploads direct, backend issues URLs)    |
| **Observability**                    | **Sentry** (errors) + **Axiom** or **BetterStack** (logs) — free tiers enough |
| **Product analytics**                | **PostHog** (self-host OSS or cloud free tier)                            |

### When you'd actually add a second language

Only three reasonable scenarios:

1. **Realtime call signalling / chat at scale** → a small **Go** or **Elixir**
   service (Phoenix + LiveView) for WebSockets. Only when you have >5k
   concurrent connections. Until then Python + Redis pub/sub is fine.
2. **ML training or heavy inference** → PyTorch/TF in Python already (same
   language, no split needed).
3. **A CPU-bound hot loop** — very rare.

Notably: you do **not** need Node.js, Rust, Java, or Kotlin for anything in your
current spec. Adding them would be resume-driven development.

### When to break the monolith into services

Extract a service **only** when one of these hurts:

- **Payments** — extract first (compliance boundary, PCI scope containment).
  Own DB.
- **Video/streaming** — probably never; you're calling Daily.co, not owning it.
- **Notifications** — extract when you have >3 channels and per-user routing
  rules.
- **Search** — extract when Postgres FTS can't keep up (>100k mentors).
- **LLM/AI pipelines** — extract when latency SLA matters (async worker pool).

Everything else stays in the modular monolith until it screams.

### Phased roadmap for Vcharo

#### Phase 1 — Foundation (~3 months, "get to first real ₹")

Same FastAPI + MongoDB you have today. Add:

- Postgres tables: `users`, `orders`, `transactions`, `verifications`, `refund_cases`
- Razorpay integration (payments + escrow + Payouts API for mentor NEFT)
- Google + LinkedIn OAuth (Emergent-managed Google Auth first)
- Cloudflare R2 for resume + ID uploads
- Real backend endpoints replacing the localStorage stores in `/src/lib/*`

#### Phase 2 — Product depth (~6 months, when paying users exist)

- Daily.co or 100ms for live 1:1 sessions with recording
- Celery workers for payout batches, transactional emails, verification queue
- Sentry + PostHog wired up
- LLM-assisted mentor profile writing (Emergent LLM key) — auto-draft the "bio"
  and "expertise" fields from LinkedIn OAuth data during onboarding

#### Phase 3 — Scaling out (~18 months, if traction warrants)

Extract:
- **Payments service** — own repo, own Postgres, internal REST/gRPC
- **Notifications service**

Everything else stays in the modular monolith.

---

## Emergent platform caveat

Emergent's managed platform is optimised for **FastAPI + React + MongoDB** as a
single app. Adding Postgres, Redis, or a second-language service means the
deployment story changes — you'd likely need managed services (Neon / Supabase
for Postgres, Upstash for Redis) or a self-hosted setup.

That's not a code question, it's a platform question. When ready to move on
Phase 1 or Phase 2 items, **`support_agent` is the right place** to confirm
which parts Emergent can host and which need external services.

---

## Related documents

- `/app/Requirement.md` — running product / feature requirements
- `/app/README.md` — build status, changelog, agent-surfaced backlog
- This file (`/app/BackendRequirements.md`) — one-shot architecture doc,
  updated when direction changes
