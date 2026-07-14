import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  BadgeCheck,
  Wallet,
  ArrowRight,
  Check,
  X as XIcon,
} from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import Pricing from '../components/vcharo/Pricing';
import FAQ from '../components/vcharo/FAQ';
import CTABand from '../components/vcharo/CTABand';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Toaster } from '../components/ui/sonner';

const HINDI_NUMS = ['एक', 'दो', 'तीन', 'चार', 'पाँच'];

const menteeSteps = [
  {
    title: 'Discover — pick a domain, then a person',
    body: 'Filter by domain, price, and language. Every mentor lists their real experience and current company.',
    detail: 'Behind the scenes: we manually review each mentor. Under 8% of applicants make it through.',
  },
  {
    title: 'Free 15-minute intro',
    body: 'Before you spend a rupee, every mentor offers a free chemistry-check call. Pick a slot from their live availability.',
    detail: 'If it does not click, cancel — no penalty. You keep your budget for a better fit.',
  },
  {
    title: 'Book your first paid session',
    body: 'Pick a 45-minute 1:1 or a 60-minute mock interview. Pay in ₹ via UPI, cards, or netbanking.',
    detail: 'Escrow: your money is held by Vcharo. It only moves to your mentor after the call actually happens.',
  },
  {
    title: 'Structured journey doc',
    body: 'A living Google-Doc-style artifact lives between the two of you — goals, deadlines, action items, links.',
    detail: 'The doc outlives any single call and is what turns "chit-chat mentoring" into shipped progress.',
  },
  {
    title: 'Track outcomes — not vibes',
    body: 'Streaks, weekly reviews, and quiet WhatsApp check-ins. Your mentor sees when you slip; so do you.',
    detail: 'The outcome-tracker is what mentees say separates Vcharo from a Topmate DM chain.',
  },
];

const mentorSteps = [
  {
    title: 'Apply — 8 minutes, honest',
    body: 'Share your LinkedIn, current company, past mentoring, and one paragraph on why. No fluff sections.',
    detail: 'We reject 90%+ of applicants. Being rejected is not a slight — the bar for verified is deliberately steep.',
  },
  {
    title: 'Verification, 5 working days',
    body: 'We check employment, references, and pull a sample intro call before you go live.',
    detail: 'Our verification team is small on purpose — quality-controlled by humans, not scraped scores.',
  },
  {
    title: 'Set your terms',
    body: 'Your hours, your price, your topics. Session types: intro / 1:1 / mock interview / journey (monthly).',
    detail: 'You can offer discounts to specific mentees but never charge above your public price — Vcharo enforces this.',
  },
  {
    title: 'Get matched',
    body: 'Mentees find you via search, discovery filters, or Vcharo\'s weekly hand-matched shortlists.',
    detail: 'You can also proactively send a connect request to a promising mentee, with a discounted price if you want.',
  },
  {
    title: 'Build a public portfolio',
    body: 'Every session builds a verifiable track record — session count, ratings, testimonials. Public forever.',
    detail: 'Show it in your next promo cycle, conference bio, or "why hire me" case. Ownership stays with you.',
  },
];

const trustCards = [
  {
    icon: Wallet,
    title: 'Escrow-backed payments',
    body: 'Every rupee is held by Vcharo until the session actually happens. Full refund if the call is missed.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified mentors (human-reviewed)',
    body: 'Employment, references, and a sample intro call. No badge without a real person behind the check.',
  },
  {
    icon: ShieldCheck,
    title: 'Fair use, both ways',
    body: 'Mentors can decline any mentee; mentees can leave a mentor any time. No lock-ins beyond a paid month.',
  },
  {
    icon: Clock,
    title: 'Cancellation rules — clear',
    body: 'Cancel 24 hours ahead — no charge. Under 24 hours — mentor keeps 50%. No-show by mentor — 100% refund.',
  },
];

const sessionAnatomy = [
  {
    tag: 'Before',
    title: '5 min · Set the frame',
    body: 'Mentee fills a 4-question pre-session doc: "what is on fire", "what did I try", "what I need this call to unblock".',
  },
  {
    tag: 'During',
    title: '45 min · Structured deep-dive',
    body: 'First 10 min: context. Next 25 min: work through the problem together. Last 10 min: concrete action items with owners and dates.',
  },
  {
    tag: 'After',
    title: '48 hrs · Journey doc updated',
    body: 'Mentor writes 3–5 bullet action items into the shared journey doc. Vcharo pings you (once) if you slip on a deadline.',
  },
];

const comparisonRows = [
  { label: 'Structured journey doc between calls', v: true, t: false, a: false, f: false },
  { label: 'Human-verified mentors (< 8% acceptance)', v: true, t: false, a: false, f: false },
  { label: 'Escrow-backed payments in ₹', v: true, t: false, a: false, f: false },
  { label: 'Refund policy tied to session actually happening', v: true, t: 'Partial', a: false, f: 'n/a' },
  { label: 'Accountability tracker + weekly nudges', v: true, t: false, a: false, f: false },
  { label: 'Free 15-min intro before you pay', v: true, t: 'Some mentors', a: 'Some mentors', f: 'n/a' },
  { label: 'Priced for Indian wallet (₹, UPI, EMI)', v: true, t: 'Mixed', a: false, f: 'n/a' },
  { label: 'Verifiable mentor portfolio for their career', v: true, t: false, a: false, f: false },
];

const Cell = ({ v }) => {
  if (v === true)
    return (
      <div className="grid h-6 w-6 place-items-center border border-navy bg-saffron">
        <Check size={14} className="text-navy" strokeWidth={3} />
      </div>
    );
  if (v === false)
    return (
      <div className="grid h-6 w-6 place-items-center border border-black/15 text-navy/40">
        <XIcon size={14} />
      </div>
    );
  return <span className="text-xs text-navy/60">{v}</span>;
};

export default function HowItWorksPage() {
  const [params, setParams] = useSearchParams();
  const [track, setTrack] = useState(params.get('track') === 'mentor' ? 'mentor' : 'mentee');

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (track === 'mentor') next.set('track', 'mentor');
    else next.delete('track');
    setParams(next, { replace: true });
  }, [track, params, setParams]);

  const steps = useMemo(() => (track === 'mentor' ? mentorSteps : menteeSteps), [track]);

  return (
    <div className="relative min-h-screen paper-noise" data-testid="how-it-works-page">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">How Vcharo works</div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            From first message to first ₹,
            <br />
            <span className="italic">everything in the open</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            The mechanics of Vcharo — how mentors are verified, how payments are held, what happens
            between calls, and why we think this is different from every &quot;book a call&quot; link you have
            already tried.
          </p>

          <div className="mt-10">
            <Tabs value={track} onValueChange={setTrack}>
              <TabsList className="inline-flex h-auto gap-0 rounded-none border border-black/15 bg-paper p-0">
                <TabsTrigger
                  value="mentee"
                  data-testid="hiw-track-mentee"
                  className="rounded-none border-r border-black/15 px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  For Mentees
                </TabsTrigger>
                <TabsTrigger
                  value="mentor"
                  data-testid="hiw-track-mentor"
                  className="rounded-none px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  For Mentors
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* 5-step journey */}
      <section id="journey" className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">The journey</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Five steps.{' '}
              {track === 'mentor' ? 'From application to your first paid session.' : 'From landing on Vcharo to your first outcome.'}
            </h2>
          </div>

          <ol className="mt-14 space-y-6" data-testid="hiw-journey-steps">
            {steps.map((s, i) => (
              <li
                key={i}
                data-testid={`hiw-step-${i}`}
                className="grid grid-cols-1 gap-8 border border-black/15 bg-paper p-8 sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-10"
              >
                <div className="flex sm:block">
                  <div className="font-serif text-5xl font-bold text-saffron leading-none sm:text-6xl">
                    0{i + 1}
                  </div>
                  <div className="ml-4 font-devanagari text-xl text-navy/60 sm:ml-0 sm:mt-2">
                    {HINDI_NUMS[i]}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-navy sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/80 sm:text-base">{s.body}</p>
                  <div className="mt-6 border-l-2 border-saffron bg-sand/60 p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-saffron">
                      Under the hood
                    </div>
                    <div className="mt-1 text-sm text-navy/75">{s.detail}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust & mechanics */}
      <section className="border-b border-black/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Trust & mechanics</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              The <span className="italic">boring</span> parts, in plain English.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2" data-testid="hiw-trust-cards">
            {trustCards.map((c, i) => (
              <div
                key={c.title}
                data-testid={`hiw-trust-${i}`}
                className="flex gap-5 border border-black/15 bg-paper p-8"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center border border-black/15 bg-sand/50">
                  <c.icon size={20} className="text-saffron" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-navy">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/75">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session anatomy */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Session anatomy</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              What a Vcharo session <span className="italic">actually</span> looks like.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" data-testid="hiw-anatomy">
            {sessionAnatomy.map((a, i) => (
              <div
                key={a.tag}
                data-testid={`hiw-anatomy-${i}`}
                className={`flex flex-col border p-8 ${
                  i === 1 ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy'
                }`}
              >
                <div
                  className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${
                    i === 1 ? 'text-saffron' : 'text-saffron'
                  }`}
                >
                  {a.tag}
                </div>
                <h3 className={`mt-4 font-serif text-xl font-semibold ${i === 1 ? 'text-paper' : 'text-navy'}`}>
                  {a.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 1 ? 'text-paper/80' : 'text-navy/75'}`}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <Pricing />

      {/* Comparison table */}
      <section className="border-b border-black/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Vcharo vs the rest</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              The <span className="italic">honest</span> comparison.
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left" data-testid="hiw-comparison">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="py-4 text-xs font-semibold uppercase tracking-widest text-navy/60">Feature</th>
                  <th className="py-4 text-center text-xs font-semibold uppercase tracking-widest text-saffron">Vcharo</th>
                  <th className="py-4 text-center text-xs font-semibold uppercase tracking-widest text-navy/60">Topmate</th>
                  <th className="py-4 text-center text-xs font-semibold uppercase tracking-widest text-navy/60">ADPList</th>
                  <th className="py-4 text-center text-xs font-semibold uppercase tracking-widest text-navy/60">Free forums</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    data-testid={`hiw-compare-row-${i}`}
                    className="border-b border-black/10 hover:bg-sand/40"
                  >
                    <td className="py-4 pr-4 text-sm text-navy/85">{row.label}</td>
                    <td className="py-4 text-center">
                      <div className="inline-flex"><Cell v={row.v} /></div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="inline-flex"><Cell v={row.t} /></div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="inline-flex"><Cell v={row.a} /></div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="inline-flex"><Cell v={row.f} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <Link
              data-testid="hiw-comparison-cta"
              to="/mentors"
              className="inline-flex items-center gap-2 border-2 border-navy bg-saffron px-6 py-3 text-sm font-semibold uppercase tracking-widest text-navy btn-tactile"
            >
              Browse verified mentors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTABand />

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
