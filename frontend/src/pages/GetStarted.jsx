import { Link } from 'react-router-dom';
import { GraduationCap, Users2, ArrowRight } from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import { Toaster } from '../components/ui/sonner';

const RoleTile = ({ to, testId, icon: Icon, label, hindi, sub, cta }) => (
  <Link
    to={to}
    data-testid={testId}
    className="group flex flex-1 flex-col border-2 border-black/15 bg-paper p-8 transition-colors hover:border-navy sm:p-10"
  >
    <div className="grid h-14 w-14 place-items-center border border-black/15 bg-sand/50">
      <Icon size={22} className="text-saffron" />
    </div>
    <h2 className="mt-6 font-serif text-3xl font-semibold text-navy sm:text-4xl">{label}</h2>
    <div className="mt-1 font-devanagari text-lg text-saffron">{hindi}</div>
    <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/70 sm:text-base">{sub}</p>
    <div className="mt-auto pt-10">
      <span className="btn-tactile inline-flex items-center gap-2 border-2 border-navy bg-saffron px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy transition-transform group-hover:-translate-y-0.5">
        {cta} <ArrowRight size={14} />
      </span>
    </div>
  </Link>
);

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen paper-noise" data-testid="get-started-page">
      <Navbar />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Get started &middot; <span className="font-devanagari">शुरुआत</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Which side of <span className="italic">Vcharo</span> are you on?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            Pick the path that fits &mdash; a 60-second signup is all it takes. You can always
            switch later.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 lg:flex-row lg:gap-8 lg:px-10">
          <RoleTile
            to="/onboarding/mentee"
            testId="get-started-mentee"
            icon={GraduationCap}
            label="I'm a Mentee"
            hindi="मैं सीखने आया हूँ"
            sub="Aspiring professional, student, or someone in the middle of a switch. Find a mentor in 4 quick steps."
            cta="Start mentee signup"
          />
          <RoleTile
            to="/onboarding/mentor"
            testId="get-started-mentor"
            icon={Users2}
            label="I'm a Mentor"
            hindi="मैं मार्गदर्शक हूँ"
            sub="Senior IC or leader. Apply to join Vcharo &mdash; verification takes 5 working days once your application is complete."
            cta="Apply to mentor"
          />
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
