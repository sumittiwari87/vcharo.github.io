import { testimonials } from '../../data/vicharo';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="border-b border-black/10 bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">Success stories</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Real mentees. Real <span className="italic">outcomes</span>.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-testid={`testimonial-${i}`}
              className={`relative flex h-full flex-col border p-8 ${i === 1 ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy'}`}
            >
              <Quote
                size={28}
                className={`${i === 1 ? 'text-saffron' : 'text-saffron/80'}`}
                strokeWidth={1.5}
              />
              <blockquote
                className={`mt-6 font-serif text-lg leading-snug sm:text-xl ${i === 1 ? 'text-paper' : 'text-navy'}`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border border-black/10"
                  loading="lazy"
                />
                <div>
                  <div className={`font-medium ${i === 1 ? 'text-paper' : 'text-navy'}`}>{t.name}</div>
                  <div
                    className={`text-xs ${i === 1 ? 'text-paper/60' : 'text-navy/60'}`}
                  >
                    {t.role} · {t.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
