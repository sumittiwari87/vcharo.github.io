import { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Languages,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Toaster } from '../components/ui/sonner';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import VerifiedBadges from '../components/vcharo/VerifiedBadges';
import { mentors } from '../data/vcharo';
import { getMentor } from '../lib/mentorStore';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const StarRow = ({ value }) => {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= full ? '#F57A00' : 'transparent'}
          stroke={i <= full ? '#F57A00' : '#0B132B33'}
        />
      ))}
    </div>
  );
};

const NotFound = () => (
  <div className="mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
    <div className="text-xs uppercase tracking-[0.25em] text-saffron">404</div>
    <h1 className="mt-6 font-serif text-4xl font-semibold text-navy sm:text-5xl">
      Mentor not found.
    </h1>
    <p className="mt-4 text-navy/70">
      That mentor may be inactive or the link is broken.
    </p>
    <Link
      to="/"
      data-testid="mentor-notfound-home-link"
      className="mt-8 inline-flex items-center gap-2 border-2 border-navy bg-paper px-6 py-3 text-sm font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
    >
      <ArrowLeft size={16} /> Back to home
    </Link>
  </div>
);

export default function MentorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = useMemo(() => getMentor(id), [id]);

  const [selectedSessionIdx, setSelectedSessionIdx] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!mentor) {
    return (
      <div className="relative min-h-screen paper-noise" data-testid="mentor-profile-notfound">
        <Navbar />
        <NotFound />
        <Footer />
      </div>
    );
  }

  const otherMentors = mentors.filter((m) => m.id !== mentor.id).slice(0, 3);
  const selectedSession = mentor.sessionTypes[selectedSessionIdx];

  const requestBooking = async () => {
    if (!selectedDay || !selectedSlot) {
      toast.error('Pick a day and a slot to continue.');
      return;
    }
    setBooking(true);
    try {
      // Booking is not built yet — reuse waitlist to capture interest.
      await axios.post(`${API}/waitlist`, {
        email: `booking-request+${mentor.id}@vcharo.in`,
        role: 'mentee',
        source: `mentor-${mentor.id}-${selectedDay}-${selectedSlot}`,
      });
      toast.success(
        `Request received for ${mentor.name} on ${selectedDay} at ${selectedSlot}. We'll confirm your slot by email soon.`,
      );
    } catch (e) {
      toast.error('Could not send booking request. Try again in a moment.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="relative min-h-screen paper-noise" data-testid="mentor-profile-page">
      <Navbar />

      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          data-testid="mentor-back-btn"
          className="inline-flex items-center gap-2 text-sm text-navy/70 transition-colors hover:text-saffron"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 pt-10 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pb-24 lg:pt-14">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 saffron-glow" aria-hidden />
              <img
                src={mentor.photo}
                alt={mentor.name}
                data-testid="mentor-hero-photo"
                className="relative arch-top h-[480px] w-full border border-black/10 object-cover object-top"
              />
              {mentor.verified && (
                <div
                  data-testid="mentor-verified-badge"
                  className="absolute -bottom-4 left-6 z-10 inline-flex items-center gap-2 border border-navy bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy shadow-sm"
                >
                  <Award size={14} className="text-saffron" /> Vcharo verified
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">{mentor.domain}</div>
            <h1
              data-testid="mentor-name"
              className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl"
            >
              {mentor.name}
            </h1>
            <p className="mt-3 text-lg text-navy/80" data-testid="mentor-title">
              {mentor.title}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy/75">
              <div className="flex items-center gap-2" data-testid="mentor-rating">
                <StarRow value={mentor.rating} />
                <span className="font-medium text-navy">{mentor.rating}</span>
                <span className="text-navy/60">({mentor.reviewCount} reviews)</span>
              </div>
              <span className="hidden text-saffron sm:inline">·</span>
              <div className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-saffron" />
                {mentor.location}
              </div>
              <span className="hidden text-saffron sm:inline">·</span>
              <div className="inline-flex items-center gap-2" data-testid="mentor-response-time">
                <Clock size={14} className="text-saffron" />
                Replies in {mentor.responseTime.toLowerCase()}
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-navy/75">
              <Languages size={14} className="text-saffron" />
              <span>Speaks: {mentor.languages.join(' · ')}</span>
            </div>

            {mentor.verified_badges && mentor.verified_badges.length > 0 && (
              <div className="mt-6" data-testid="mentor-hero-badges">
                <VerifiedBadges badges={mentor.verified_badges} />
              </div>
            )}

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-navy/80 sm:text-lg" data-testid="mentor-bio">
              {mentor.bio}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-black/10 pt-8 sm:max-w-md">
              <div>
                <div className="font-serif text-2xl font-bold text-navy">{mentor.sessions}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-navy/60">Sessions</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-navy">{mentor.yearsExp}y</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-navy/60">Experience</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-navy">{mentor.reviewCount}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-navy/60">Reviews</div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                data-testid="mentor-hero-book-btn"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-tactile group h-auto rounded-none border-2 border-navy bg-saffron px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-saffron"
              >
                <Calendar size={16} className="mr-2" /> Book a session
              </Button>
              <Button
                data-testid="mentor-hero-discovery-btn"
                onClick={() => {
                  setSelectedSessionIdx(0);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="ghost"
                className="btn-tactile h-auto rounded-none border-2 border-navy bg-paper px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-paper"
              >
                Free 15-min intro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE + EXPERIENCE (2-col) */}
      <section className="border-b border-black/10 bg-sand/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Expertise</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              What {mentor.name.split(' ')[0]} <span className="italic">actually</span> helps with.
            </h2>
            <ul className="mt-8 space-y-3" data-testid="mentor-expertise-list">
              {mentor.expertise.map((e, i) => (
                <li
                  key={e}
                  data-testid={`mentor-expertise-${i}`}
                  className="flex items-start gap-3 border border-black/15 bg-paper p-4"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-saffron" />
                  <span className="text-sm leading-relaxed text-navy/85">{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Career</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Experience & education.
            </h2>

            <div className="mt-8 space-y-6" data-testid="mentor-experience-list">
              {mentor.experience.map((x, i) => (
                <div
                  key={i}
                  data-testid={`mentor-experience-${i}`}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/10 pb-6 last:border-b-0"
                >
                  <div className="grid h-10 w-10 place-items-center border border-black/15 bg-paper">
                    <Briefcase size={16} className="text-saffron" />
                  </div>
                  <div>
                    <div className="font-serif text-lg font-semibold text-navy">
                      {x.role}
                    </div>
                    <div className="text-sm text-navy/70">
                      {x.company} · <span className="text-navy/50">{x.period}</span>
                    </div>
                  </div>
                </div>
              ))}
              {mentor.education.map((x, i) => (
                <div
                  key={`edu-${i}`}
                  data-testid={`mentor-education-${i}`}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/10 pb-6 last:border-b-0"
                >
                  <div className="grid h-10 w-10 place-items-center border border-black/15 bg-paper">
                    <GraduationCap size={16} className="text-saffron" />
                  </div>
                  <div>
                    <div className="font-serif text-lg font-semibold text-navy">
                      {x.degree}
                    </div>
                    <div className="text-sm text-navy/70">
                      {x.school} · <span className="text-navy/50">{x.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="border-b border-black/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Book</div>
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Pick a session. Pick a <span className="italic">slot</span>.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Session types */}
            <div className="lg:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-widest text-navy/50">
                Session type
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" data-testid="mentor-session-types">
                {mentor.sessionTypes.map((s, i) => (
                  <button
                    key={s.name}
                    data-testid={`mentor-session-type-${i}`}
                    onClick={() => setSelectedSessionIdx(i)}
                    className={`border p-5 text-left transition-colors ${
                      selectedSessionIdx === i
                        ? 'border-navy bg-navy text-paper'
                        : 'border-black/15 bg-paper text-navy hover:border-navy'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-serif text-lg font-semibold">{s.name}</div>
                        <div className={`mt-0.5 text-xs uppercase tracking-widest ${selectedSessionIdx === i ? 'text-saffron' : 'text-navy/50'}`}>
                          {s.duration}
                        </div>
                      </div>
                      <div className="font-serif text-lg font-bold">{s.price}</div>
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed ${selectedSessionIdx === i ? 'text-paper/80' : 'text-navy/70'}`}>
                      {s.blurb}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-10 text-xs font-semibold uppercase tracking-widest text-navy/50">
                Availability (IST)
              </div>
              <div className="mt-4 space-y-3" data-testid="mentor-availability">
                {mentor.availability.map((a) => (
                  <div
                    key={a.day}
                    data-testid={`mentor-availability-${a.day.toLowerCase()}`}
                    className="grid grid-cols-[80px_1fr] items-center gap-4 border border-black/15 bg-paper p-4"
                  >
                    <div className="font-serif text-lg font-semibold text-navy">{a.day}</div>
                    <div className="flex flex-wrap gap-2">
                      {a.slots.map((slot) => {
                        const active = selectedDay === a.day && selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            data-testid={`slot-${a.day.toLowerCase()}-${slot.replace(/\s+/g, '')}`}
                            onClick={() => {
                              setSelectedDay(a.day);
                              setSelectedSlot(slot);
                            }}
                            className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                              active
                                ? 'border-saffron bg-saffron text-navy'
                                : 'border-black/15 text-navy hover:border-navy'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking summary */}
            <aside className="lg:col-span-5">
              <div className="sticky top-24 border border-black/15 bg-paper p-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-saffron">
                  Your session
                </div>
                <div className="mt-3 font-serif text-2xl font-semibold text-navy">
                  {selectedSession.name}
                </div>
                <div className="mt-1 text-sm text-navy/70">
                  {selectedSession.duration} with {mentor.name}
                </div>

                <div className="mt-6 border-y border-black/10 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy/70">Date & time</span>
                    <span className="text-sm font-medium text-navy" data-testid="booking-selected-slot">
                      {selectedDay && selectedSlot ? `${selectedDay} · ${selectedSlot} IST` : 'Pick a slot →'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-navy/70">Total</span>
                    <span className="font-serif text-2xl font-bold text-navy" data-testid="booking-total">
                      {selectedSession.price}
                    </span>
                  </div>
                </div>

                <Button
                  data-testid="booking-confirm-btn"
                  disabled={booking}
                  onClick={requestBooking}
                  className="btn-tactile mt-6 h-auto w-full rounded-none border-2 border-navy bg-saffron px-6 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                >
                  {booking ? 'Sending…' : selectedSession.priceValue === 0 ? 'Request intro call' : 'Request booking'}
                </Button>
                <p className="mt-4 text-xs leading-relaxed text-navy/55">
                  Escrow-backed. Money is only released to the mentor after the session. Full refund if the call
                  doesn&apos;t happen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-b border-black/10 bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.25em] text-saffron">Reviews</div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                {mentor.rating} <span className="text-saffron">★</span>{' '}
                <span className="italic">from</span> {mentor.reviewCount} mentees.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" data-testid="mentor-reviews">
            {mentor.reviews.map((r, i) => (
              <figure
                key={i}
                data-testid={`mentor-review-${i}`}
                className="flex h-full flex-col border border-black/15 bg-paper p-8"
              >
                <StarRow value={r.rating} />
                <blockquote className="mt-5 font-serif text-lg leading-snug text-navy">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-8 text-sm">
                  <div className="font-medium text-navy">{r.name}</div>
                  <div className="text-xs text-navy/55">
                    {r.city} · {r.date}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER MENTORS */}
      <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">More mentors</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Not the right fit? Try one of <span className="italic">these</span>.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3" data-testid="mentor-related">
            {otherMentors.map((m) => (
              <Link
                key={m.id}
                to={`/mentors/${m.id}`}
                data-testid={`mentor-related-${m.id}`}
                className="group flex flex-col border border-black/15 bg-paper transition-colors hover:border-navy"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[10px] uppercase tracking-widest text-saffron">{m.domain}</div>
                  <div className="mt-2 font-serif text-lg font-semibold text-navy">{m.name}</div>
                  <div className="text-sm text-navy/70">{m.title}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-sm">
                    <div className="inline-flex items-center gap-1 text-navy">
                      <Star size={12} fill="#F57A00" stroke="#F57A00" /> {m.rating}
                    </div>
                    <span className="font-serif font-semibold text-navy">{m.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
