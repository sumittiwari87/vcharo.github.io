import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { pricingPlans } from '../../data/vcharo';

export const Pricing = () => {
  return (
    <section id="pricing" className="border-b border-black/10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Pricing</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Priced for <span className="italic">India</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-navy/70">
            No subscription lock-in. Cancel a journey any time. Every session is escrow-backed —
            we release only after the call.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {pricingPlans.map((p, i) => (
            <div
              key={p.name}
              data-testid={`pricing-plan-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`relative flex h-full flex-col border p-8 transition-transform duration-300 hover:-translate-y-1 ${p.highlight ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy'}`}
            >
              {p.tag && (
                <div className="absolute -top-3 left-8 border border-navy bg-saffron px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-navy">
                  {p.tag}
                </div>
              )}
              <h3 className={`font-serif text-2xl font-semibold ${p.highlight ? 'text-paper' : 'text-navy'}`}>
                {p.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span className={`font-serif text-4xl font-bold ${p.highlight ? 'text-paper' : 'text-navy'}`}>
                  {p.price}
                </span>
              </div>
              <p className={`mt-1 text-sm ${p.highlight ? 'text-paper/60' : 'text-navy/60'}`}>
                {p.cadence}
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={`mt-0.5 shrink-0 ${p.highlight ? 'text-saffron' : 'text-saffron'}`} />
                    <span className={p.highlight ? 'text-paper/90' : 'text-navy/85'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                data-testid={`pricing-cta-${i}`}
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className={`mt-10 h-auto w-full rounded-none border-2 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${p.highlight ? 'border-saffron bg-saffron text-navy hover:bg-saffron' : 'border-navy bg-paper text-navy hover:bg-navy hover:text-paper'}`}
              >
                {p.highlight ? 'Start journey' : 'Choose plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
