import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { stats } from '../../data/vicharo';

export const Hero = () => {
  const scrollToWaitlist = (role) => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const roleInput = document.querySelector(`[data-role="${role}"]`);
      if (roleInput) roleInput.click();
    }
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-black/10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-16 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-32 lg:pt-24">
        {/* LEFT — headline */}
        <div className="lg:col-span-7 fade-up">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-1.5">
            <Sparkles size={14} className="text-saffron" />
            <span className="text-xs font-medium tracking-wide text-navy/80">
              Now onboarding mentors from India&apos;s top 50 companies
            </span>
          </div>

          <h1 className="font-serif text-[42px] font-bold leading-[0.95] tracking-tight text-navy sm:text-6xl lg:text-7xl">
            Mentorship
            <br />
            that moves
            <br />
            <span className="italic">careers</span>{' '}
            <span className="font-devanagari text-saffron">आगे</span>.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg">
            VICHARO — from{' '}
            <span className="font-devanagari text-saffron">विचार</span>, a thoughtful connector —
            pairs ambitious professionals from Tier 2/3 India with senior domain experts through
            structured journeys, not one-off calls.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              data-testid="hero-find-mentor-btn"
              onClick={() => scrollToWaitlist('mentee')}
              className="btn-tactile group h-auto rounded-none border-2 border-navy bg-saffron px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-saffron"
            >
              Find a mentor
              <ArrowUpRight size={18} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              data-testid="hero-become-mentor-btn"
              onClick={() => scrollToWaitlist('mentor')}
              variant="ghost"
              className="btn-tactile h-auto rounded-none border-2 border-navy bg-paper px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-paper"
            >
              Become a mentor
            </Button>
          </div>

          {/* trust strip */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-black/10 pt-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-testid={`hero-stat-${i}`}>
                <div className="font-serif text-3xl font-bold text-navy">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-navy/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image composition */}
        <div className="relative lg:col-span-5">
          <div className="absolute -right-16 top-8 h-[420px] w-[420px] rounded-full saffron-glow" aria-hidden />
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5862268/pexels-photo-5862268.jpeg"
              alt="Senior mentor guiding a young professional"
              className="relative z-10 arch-top h-[420px] w-full object-cover border border-black/10 sm:h-[520px]"
              loading="eager"
            />
            <img
              src="https://images.pexels.com/photos/9159272/pexels-photo-9159272.jpeg"
              alt="Student working on laptop"
              className="absolute -bottom-8 -left-6 z-20 hidden h-40 w-40 object-cover border-4 border-paper shadow-md md:block lg:h-48 lg:w-48"
              loading="lazy"
            />
            <div className="absolute -right-4 top-6 z-20 hidden rotate-3 border border-black/10 bg-paper px-4 py-3 shadow-sm md:block">
              <div className="text-[10px] uppercase tracking-widest text-navy/60">Live now</div>
              <div className="text-sm font-medium text-navy">42 sessions today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
