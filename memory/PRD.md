# Vcharo — Product Requirements Document

## Original Problem Statement
High-conversion marketing landing page for Vcharo — a two-sided mentor-mentee marketplace
connecting aspiring professionals from Tier 2/3 India with senior domain experts. Public
entry point for both mentees and mentors.

## Target Users
- Primary: Aspiring professionals & students from Tier 2/3 Indian cities looking for
  accessible, structured mentorship.
- Secondary: Senior professionals & domain experts wanting to monetize expertise and
  build a verifiable mentoring portfolio.

## Design Direction
Editorial edtech aesthetic with Indian identity accent.
- Palette: navy (#0B132B), saffron (#F57A00), amber (#FFB238), sand (#EAE2D6), paper (#FDFBF7)
- Typography: Playfair Display (headings), Outfit (body), Rozha One (Devanagari accents)
- Paper noise overlay, arch-top imagery, neo-brutalist offset shadows on buttons, asymmetric layouts

## Architecture
- Frontend: React + Tailwind + shadcn/ui, sonner for toasts, lucide-react icons
- Backend: FastAPI on 0.0.0.0:8001, all routes prefixed with /api
- Database: MongoDB — `waitlist` collection (email, role, source, created_at)
- Env vars: MONGO_URL, DB_NAME, CORS_ORIGINS, REACT_APP_BACKEND_URL

## What's been implemented (v1 — 2026-12)
- Backend endpoints:
  - GET /api/ health
  - POST /api/waitlist (dedupes by email, validates role)
  - GET /api/waitlist/count
- Frontend landing page sections:
  - Navbar (sticky, mobile menu, Devanagari accent)
  - Hero (split layout, dual CTAs, live stats, arch-top imagery)
  - Problem → Solution strip
  - How It Works (shadcn Tabs — mentee vs mentor)
  - Featured Categories (bento grid, 6 domains)
  - Why Vcharo (4 value cards)
  - Featured Mentors (horizontal scroller, 4 curated mentors)
  - Testimonials (3 stories, middle card inverted navy)
  - For Mentors band (dark navy, saffron glow, 6 perks)
  - Pricing (3 plans — Single Session, Journey, Career Sprint)
  - FAQ (shadcn Accordion, 7 questions)
  - CTA Band with functional waitlist form (mentee/mentor toggle, sonner toast on success)
  - Footer (4 columns, socials, meta)
- All interactive elements have `data-testid`
- Sonner toaster mounted, richColors, top-center

## Testing
- Iteration 1: 100% backend, 100% frontend — /app/test_reports/iteration_1.json

## Backlog / Future
- P0 mentor discovery + filter page
- P0 booking + calendar integration (Cal.com or custom)
- P0 payments (Razorpay for India, Stripe for global)
- P1 mentor dashboard (session notes, action items, progress)
- P1 verified credentials badge system
- P2 Hindi + regional language toggle
- P2 SendGrid/Resend confirmation email on waitlist signup
- P2 mentor onboarding form + admin approval flow
