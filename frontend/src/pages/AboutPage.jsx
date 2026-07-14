import { Link } from 'react-router-dom';
import { Linkedin, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import CTABand from '../components/vcharo/CTABand';
import { Toaster } from '../components/ui/sonner';
import { beliefs, teamLeadership, teamMembers, advisors, stats } from '../data/vcharo';

const PersonCard = ({ p, size = 'lg', testId }) => (
  <article
    data-testid={testId}
    className={`group flex flex-col border border-black/15 bg-paper transition-colors hover:border-navy ${size === 'lg' ? '' : ''}`}
  >
    <div className="relative overflow-hidden">
      <img
        src={p.photo}
        alt={p.name}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${size === 'lg' ? 'h-72' : 'h-56'}`}
      />
      <a
        href={p.linkedin}
        aria-label={`${p.name} on LinkedIn`}
        data-testid={`${testId}-linkedin`}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-navy bg-paper text-navy transition-colors hover:bg-saffron hover:border-saffron"
      >
        <Linkedin size={15} />
      </a>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <div className="text-[10px] uppercase tracking-widest text-saffron">{p.role}</div>
      <h3 className={`mt-2 font-serif font-semibold text-navy ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
        {p.name}
      </h3>
      <div className="mt-1 text-xs text-navy/55">{p.city}</div>
      <p className="mt-4 text-sm leading-relaxed text-navy/75">{p.owns}</p>
    </div>
  </article>
);

export default function AboutPage() {
  return (
    <div className="relative min-h-screen paper-noise" data-testid="about-page">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            About &middot; <span className="font-devanagari">हम कौन हैं</span>
          </div>
          <h1 className="mt-4 max-w-5xl font-serif text-4xl font-bold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            We&apos;re building the mentor network
            <br />
            <span className="italic">Tier 2/3 India</span> never had.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            Vcharo is a two-sided marketplace that connects ambitious professionals and students
            from every corner of India with hand-picked senior domain experts &mdash; through
            structured journeys, not one-off chats.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Our story</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              A gap we felt <span className="italic">personally</span>.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-navy/80 lg:col-span-8">
            <p>
              Vcharo began with a simple observation: an ambitious 20-year-old in Nagpur, Coimbatore
              or Guwahati has the same fire as one in Bengaluru, but nowhere near the same access.
              LinkedIn DMs go unanswered. Coaching costs a semester&apos;s fee. Free forums churn out
              generic advice.
            </p>
            <p>
              The founders had lived on both sides &mdash; senior ICs at product companies mentoring
              five people at a time on the side, and mentees earlier in their careers who had been
              lucky enough to find <em>one</em> good mentor and change trajectory. That asymmetry
              felt fixable.
            </p>
            <p>
              We bet that a paid, structured, verified system beats a free, unstructured one every
              time. That mentors deserve a real payout for real work. And that a college in a Tier-3
              city should not be a life sentence to a career in service companies. Vcharo is our
              attempt to codify that bet into a product.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-b border-black/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.25em] text-saffron">
                Our vision &middot; <span className="font-devanagari">दृष्टि</span>
              </div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Every ambitious Indian, <span className="italic">one search</span> away from a mentor.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="border-l-4 border-saffron bg-sand/40 p-8">
                <p className="font-serif text-xl leading-snug text-navy sm:text-2xl">
                  &ldquo;By 2030, every ambitious student in India &mdash; regardless of city, college,
                  or connections &mdash; should be one search away from a senior expert in their field.&rdquo;
                </p>
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Full UI + mentor language coverage in हिन्दी, தமிழ், मराठी, ಕನ್ನಡ, മലയാളം, ગુજરાતી',
                  'Price ceilings so a session never costs more than 1% of a Tier-3 grad\u2019s first paycheck',
                  'Vcharo Scholars \u2014 free mentorship pool for verified Tier-3 college students',
                  'Formal mentor-training program so quality does not degrade with scale',
                ].map((v, i) => (
                  <li
                    key={i}
                    data-testid={`vision-point-${i}`}
                    className="flex items-start gap-2 border border-black/15 bg-paper p-4 text-sm text-navy/85"
                  >
                    <Sparkles size={14} className="mt-1 shrink-0 text-saffron" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">What we believe</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Four principles. <span className="italic">Non-negotiable</span>.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" data-testid="about-beliefs">
            {beliefs.map((b, i) => (
              <div
                key={b.title}
                data-testid={`about-belief-${i}`}
                className="flex h-full flex-col border border-black/15 bg-paper p-8"
              >
                <div className="font-serif text-6xl font-bold text-saffron/30 leading-none">0{i + 1}</div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy">{b.title}</h3>
                <div className="mt-1 font-devanagari text-base text-saffron">{b.hindi}</div>
                <p className="mt-4 text-sm leading-relaxed text-navy/75">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="border-b border-black/10 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-10">
          {stats.map((s, i) => (
            <div key={s.label} data-testid={`about-stat-${i}`} className="border-l-4 border-saffron pl-4">
              <div className="font-serif text-3xl font-bold text-navy sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-navy/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-black/10 bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">
              Leadership &middot; <span className="font-devanagari">नेतृत्व</span>
            </div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              The people <span className="italic">accountable</span>.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="about-leadership">
            {teamLeadership.map((p) => (
              <PersonCard key={p.id} p={p} size="lg" testId={`about-leader-${p.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Also on the team */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">
              Also on the team &middot; <span className="font-devanagari">टीम</span>
            </div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              The <span className="italic">rest</span> of the team.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="about-team">
            {teamMembers.map((p) => (
              <PersonCard key={p.id} p={p} size="sm" testId={`about-team-${p.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">Advisors</div>
          <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Backed by <span className="italic">operators</span> who&apos;ve been there.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="about-advisors">
            {advisors.map((a, i) => (
              <div
                key={i}
                data-testid={`about-advisor-${i}`}
                className="border border-black/15 bg-paper p-5"
              >
                <div className="text-sm font-medium text-navy">{a.name}</div>
                <div className="mt-1 text-xs text-navy/60">{a.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers + Contact */}
      <section className="border-b border-black/10 bg-navy py-20 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Careers</div>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-paper sm:text-3xl">
              We&apos;re 12 people in Bengaluru &mdash; and hiring.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">
              Engineering (Fullstack + AI), Mentor Success, and Content. Written applications only,
              because the work is written work.
            </p>
            <a
              href="mailto:careers@vcharo.com"
              data-testid="about-careers-email"
              className="mt-6 inline-flex items-center gap-2 border-2 border-saffron bg-saffron px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy btn-tactile"
            >
              careers@vcharo.com <ArrowRight size={14} />
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Press &amp; contact</div>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-paper sm:text-3xl">
              For everything else.
            </h3>
            <dl className="mt-4 space-y-2 text-sm text-paper/80">
              <div>
                <dt className="inline text-paper/50">Press: </dt>
                <dd className="inline">
                  <a href="mailto:press@vcharo.com" className="underline decoration-saffron underline-offset-4">
                    press@vcharo.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="inline text-paper/50">Hello: </dt>
                <dd className="inline">
                  <a href="mailto:hello@vcharo.com" className="underline decoration-saffron underline-offset-4">
                    hello@vcharo.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="inline text-paper/50">Office: </dt>
                <dd className="inline">Indiranagar, Bengaluru &middot; India</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
