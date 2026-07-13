import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

const perks = [
  'Verified public portfolio & rating',
  'Set your own hours and pricing',
  '80% payout — highest in India',
  'Escrow-backed, never chase payment',
  'Async tools: journey docs, action items',
  'Verifiable proof-of-mentoring for your next role',
];

export const ForMentors = () => {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-navy py-24 text-paper lg:py-32">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full saffron-glow" aria-hidden />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="relative lg:col-span-6">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">For mentors</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl">
            Turn your <span className="italic">experience</span> into a public
            <br /> <span className="font-devanagari text-saffron">पहचान</span>.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/75">
            VICHARO isn&apos;t another mentor marketplace. Every session builds a verified track record —
            a public portfolio of the people you&apos;ve moved forward. Show it in your next promo cycle,
            your next talk, your next role.
          </p>
          <div className="mt-10">
            <Button
              data-testid="for-mentors-cta"
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('[data-role="mentor"]')?.click();
              }}
              className="btn-tactile-inverse group h-auto rounded-none border-2 border-saffron bg-saffron px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-saffron"
            >
              Apply to mentor
              <ArrowUpRight size={18} className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {perks.map((p, i) => (
              <li
                key={p}
                data-testid={`mentor-perk-${i}`}
                className="flex items-start gap-3 border border-paper/15 bg-paper/[0.03] p-5"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-saffron" />
                <span className="text-sm leading-relaxed text-paper/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ForMentors;
