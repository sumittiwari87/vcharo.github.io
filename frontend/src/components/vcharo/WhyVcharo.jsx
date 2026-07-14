import { whyPoints } from '../../data/vcharo';

export const WhyVcharo = () => {
  return (
    <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">Why Vcharo</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Built for India. Built to <span className="italic">actually</span> work.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyPoints.map((w, i) => (
            <div
              key={w.title}
              data-testid={`why-card-${i}`}
              className="group flex h-full flex-col border border-black/15 bg-paper p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="font-serif text-6xl font-bold text-saffron/30 leading-none">
                0{i + 1}
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-navy sm:text-2xl">
                {w.title}
              </h3>
              <div className="mt-1 font-devanagari text-base text-saffron">{w.hindi}</div>
              <p className="mt-4 text-sm leading-relaxed text-navy/70">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVcharo;
