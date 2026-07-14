import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, X as XIcon, ShieldCheck, Wallet, Handshake, ArrowRight } from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import Pricing from '../components/vcharo/Pricing';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { Toaster } from '../components/ui/sonner';
import { mentorEconomics, refundEvidence, refundFlow, pricingFaqs } from '../data/vcharo';

const paymentMethods = ['UPI', 'Cards', 'Netbanking', 'EMI on Journeys'];

export default function PricingPage() {
  const [params, setParams] = useSearchParams();
  const [side, setSide] = useState(params.get('side') === 'mentor' ? 'mentor' : 'mentee');

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (side === 'mentor') next.set('side', 'mentor');
    else next.delete('side');
    setParams(next, { replace: true });
  }, [side, params, setParams]);

  return (
    <div className="relative min-h-screen paper-noise" data-testid="pricing-page">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Pricing &middot; <span className="font-devanagari text-saffron">मूल्य</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Priced for India.
            <br />
            <span className="italic">Fair</span> to both sides.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            No dollar-denominated tricks, no signup fees for mentors, no hidden platform tax on
            mentees. Money is held in escrow; refunds are honest; mentors are handpicked.
          </p>

          <div className="mt-10">
            <Tabs value={side} onValueChange={setSide}>
              <TabsList className="inline-flex h-auto gap-0 rounded-none border border-black/15 bg-paper p-0">
                <TabsTrigger
                  value="mentee"
                  data-testid="pricing-side-mentee"
                  className="rounded-none border-r border-black/15 px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  For Mentees
                </TabsTrigger>
                <TabsTrigger
                  value="mentor"
                  data-testid="pricing-side-mentor"
                  className="rounded-none px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  For Mentors
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Content per side */}
      {side === 'mentee' ? (
        <>
          {/* Reuse landing pricing block */}
          <Pricing />

          {/* Payment methods strip */}
          <section className="border-b border-black/10 bg-paper py-14">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 lg:px-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-navy/60">
                Pay in ₹ &mdash; multiple methods
              </div>
              <div className="flex flex-wrap gap-3" data-testid="pricing-payment-methods">
                {paymentMethods.map((p) => (
                  <span
                    key={p}
                    data-testid={`payment-${p.toLowerCase().replace(/\s+/g, '-')}`}
                    className="border border-black/15 bg-sand/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Mentor economics */}
          <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-saffron">Mentor economics</div>
                  <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                    Keep <span className="italic">{mentorEconomics.payoutPct}%</span> of every session.
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-navy/75">
                    Vcharo takes a flat {mentorEconomics.platformFeePct}% platform fee &mdash; among the highest mentor payouts in
                    the Indian mentoring space. No signup fee. No monthly listing fee. You only pay
                    when you earn.
                  </p>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-navy">
                      <Wallet size={18} className="text-saffron" />
                      Payouts within {mentorEconomics.payoutWindow} of a completed session
                    </div>
                    <div className="flex items-center gap-3 text-sm text-navy">
                      <Handshake size={18} className="text-saffron" />
                      Direct transfer to your Indian bank via NEFT/IMPS
                    </div>
                    <div className="flex items-center gap-3 text-sm text-navy">
                      <ShieldCheck size={18} className="text-saffron" />
                      Escrow-backed &mdash; you never chase a mentee for money
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="border border-black/15 bg-paper" data-testid="mentor-earnings-table">
                    <div className="grid grid-cols-[1fr_110px_110px_110px] border-b-2 border-navy px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                      <div>Session</div>
                      <div className="text-right">Price</div>
                      <div className="text-right">Fee</div>
                      <div className="text-right text-saffron">You keep</div>
                    </div>
                    {mentorEconomics.examples.map((e, i) => (
                      <div
                        key={i}
                        data-testid={`mentor-earning-row-${i}`}
                        className="grid grid-cols-[1fr_110px_110px_110px] border-b border-black/10 px-5 py-4 last:border-b-0"
                      >
                        <div className="text-sm text-navy">{e.label}</div>
                        <div className="text-right text-sm text-navy/70">₹{e.sessionPrice.toLocaleString('en-IN')}</div>
                        <div className="text-right text-sm text-navy/50">₹{e.platformFee.toLocaleString('en-IN')}</div>
                        <div className="text-right font-serif text-base font-semibold text-navy">
                          ₹{e.mentorKeeps.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-navy/55">
                    Numbers are indicative &mdash; you set your own prices. GST (18%) is added on top of the
                    platform fee and remitted separately by Vcharo where applicable.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Your money is safe */}
      <section className="border-b border-black/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.25em] text-saffron">Your money is safe</div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                We <span className="italic">only</span> earn when you do.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-navy/75">
                Every rupee sits in escrow until the session actually happens. If the mentor no-shows
                or you have substantiated evidence the call did not deliver, we refund in full. Because
                Vcharo mentors are handpicked (under <span className="font-semibold text-navy">8%</span> of applicants
                are accepted), quality refunds are rare &mdash; which is exactly why we ask for real
                evidence, not just a bad-mood rating.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              <div className="border border-navy bg-navy p-8 text-paper" data-testid="refund-qualifies-card">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-saffron">
                  Qualifies for refund
                </div>
                <ul className="mt-5 space-y-3">
                  {refundEvidence.qualifies.map((q, i) => (
                    <li
                      key={i}
                      data-testid={`refund-qualifies-${i}`}
                      className="flex gap-2 text-sm text-paper/90"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-saffron" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-black/15 bg-paper p-8 text-navy" data-testid="refund-doesnot-card">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">
                  Does not qualify
                </div>
                <ul className="mt-5 space-y-3">
                  {refundEvidence.doesNotQualify.map((q, i) => (
                    <li
                      key={i}
                      data-testid={`refund-doesnot-${i}`}
                      className="flex gap-2 text-sm text-navy/75"
                    >
                      <XIcon size={16} className="mt-0.5 shrink-0 text-navy/40" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund flow */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Refund flow</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Three steps. <span className="italic">Honest</span> timelines.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" data-testid="refund-flow">
            {refundFlow.map((s, i) => (
              <div
                key={s.n}
                data-testid={`refund-step-${i}`}
                className="border border-black/15 bg-paper p-8"
              >
                <div className="font-serif text-5xl font-bold text-saffron leading-none">{s.n}</div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-black/10 bg-paper py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Payments FAQ</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Every payment
              <br />
              question, <span className="italic">answered</span>.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full" data-testid="pricing-faq-accordion">
              {pricingFaqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-black/15"
                  data-testid={`pricing-faq-item-${i}`}
                >
                  <AccordionTrigger className="text-left font-serif text-lg text-navy hover:text-saffron hover:no-underline sm:text-xl">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-navy/75 sm:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Start your first session &mdash; <span className="italic">money-back</span> if we don&apos;t earn it.
          </h2>
          <Link
            data-testid="pricing-final-cta"
            to="/mentors"
            className="mt-10 inline-flex items-center gap-2 border-2 border-navy bg-saffron px-7 py-4 text-sm font-semibold uppercase tracking-widest text-navy btn-tactile"
          >
            Browse verified mentors <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
