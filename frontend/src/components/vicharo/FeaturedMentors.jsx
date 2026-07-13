import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { mentors } from '../../data/vicharo';
import { Button } from '../ui/button';

export const FeaturedMentors = () => {
  const scrollerRef = useRef(null);
  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? el.clientWidth * 0.8 : -el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="mentors" className="border-b border-black/10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Featured mentors</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Meet a few of our <span className="italic">विशेषज्ञ</span>.
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              data-testid="mentors-scroll-prev"
              onClick={() => scroll('prev')}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center border border-black/15 bg-paper text-navy transition-colors hover:bg-navy hover:text-paper"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              data-testid="mentors-scroll-next"
              onClick={() => scroll('next')}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center border border-black/15 bg-paper text-navy transition-colors hover:bg-navy hover:text-paper"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          data-testid="mentors-scroller"
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mentors.map((m) => (
            <article
              key={m.id}
              data-testid={`mentor-card-${m.id}`}
              className="group relative flex min-w-[280px] max-w-[320px] shrink-0 snap-start flex-col border border-black/15 bg-paper transition-colors hover:border-navy sm:min-w-[320px]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3 border border-black/10 bg-paper/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-navy">
                  {m.domain}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1 text-sm text-navy">
                  <Star size={14} fill="#F57A00" stroke="#F57A00" />
                  <span className="font-medium">{m.rating}</span>
                  <span className="text-navy/50">· {m.sessions} sessions</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-navy">{m.name}</h3>
                <p className="mt-1 text-sm text-navy/70">{m.title}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-saffron">{m.tag}</p>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                  <span className="font-serif text-base font-semibold text-navy">{m.price}</span>
                  <Button
                    data-testid={`mentor-book-${m.id}`}
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="rounded-none border border-navy bg-navy px-3 py-2 text-xs font-semibold uppercase tracking-widest text-paper hover:bg-saffron hover:text-navy hover:border-saffron"
                  >
                    <Calendar size={13} className="mr-1.5" /> Book
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;
