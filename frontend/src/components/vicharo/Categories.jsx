import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/vicharo';

export const Categories = () => {
  return (
    <section className="border-b border-black/10 bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Domains</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Pick a <span className="italic">domain</span>. We&apos;ll pick the mentor.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-navy/70">
            Six curated tracks, 1,000+ verified mentors. Every mentor has shipped in the domain they mentor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-6">
          {categories.map((c, idx) => (
            <a
              key={c.name}
              href="#waitlist"
              data-testid={`category-card-${c.name.toLowerCase().replace(/\s+|&/g, '-')}`}
              className={`group relative overflow-hidden border border-black/15 bg-paper p-6 transition-colors duration-300 hover:border-navy sm:p-8 ${c.span} ${c.tall ? 'md:row-span-2' : ''} ${idx === 0 ? 'bg-navy text-paper hover:border-saffron' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className={`text-[11px] uppercase tracking-widest ${idx === 0 ? 'text-saffron' : 'text-navy/50'}`}
                  >
                    {c.count}
                  </div>
                  <h3
                    className={`mt-4 font-serif text-2xl font-semibold sm:text-3xl ${idx === 0 ? 'text-paper' : 'text-navy'}`}
                  >
                    {c.name}
                  </h3>
                  <div
                    className={`mt-1 font-devanagari text-lg ${idx === 0 ? 'text-saffron' : 'text-saffron/90'}`}
                  >
                    {c.hindi}
                  </div>
                </div>
                <ArrowUpRight
                  size={22}
                  className={`transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${idx === 0 ? 'text-saffron' : 'text-navy'}`}
                />
              </div>
              <p
                className={`mt-6 max-w-md text-sm leading-relaxed ${idx === 0 ? 'text-paper/75' : 'text-navy/70'} ${c.tall || c.wide ? 'sm:mt-10 sm:text-base' : ''}`}
              >
                {c.blurb}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
