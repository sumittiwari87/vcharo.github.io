import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Loader2, Mail, Clock } from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import StepIndicator from '../components/vcharo/onboarding/StepIndicator';
import VerifiedBadges from '../components/vcharo/VerifiedBadges';
import { Toaster } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useSession } from '../lib/session';
import { updateMentor } from '../lib/mentorStore';
import { mentorDomains } from '../data/vcharo';

const STEP_LABELS = ['Identity', 'Profile', 'Expertise', 'Availability', 'Review'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOTS = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 AM', '3:00 PM', '5:00 PM'];

// Map new mentor's email prefix to an existing mentor slot (for demo).
const resolveMentorSlot = (email) => {
  const map = { aarav: 'm1', nandini: 'm2', vikram: 'm3', priya: 'm4' };
  const prefix = (email || '').split('@')[0].split(/[.\-_+]/)[0].toLowerCase();
  return map[prefix] || 'm1';
};

export default function OnboardingMentorPage() {
  const navigate = useNavigate();
  const { login } = useSession();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState({
    channel: null,
    email: '',
    password: '',
    name: '',
    title: '',
    company: '',
    domain: 'Technology',
    location: '',
    tag: '',
    bio: '',
    expertise: '',
    price: 1499,
    freeIntro: true,
    availability: {}, // { Mon: ['8:00 PM'] }
    badges: [],
  });

  const patch = (p) => setData((d) => ({ ...d, ...p }));
  const toggleSlot = (day, slot) => {
    const cur = new Set(data.availability[day] || []);
    if (cur.has(slot)) cur.delete(slot);
    else cur.add(slot);
    patch({ availability: { ...data.availability, [day]: Array.from(cur) } });
  };

  const availabilityCount = useMemo(
    () => Object.values(data.availability).reduce((n, arr) => n + arr.length, 0),
    [data.availability],
  );

  const canProceed = useMemo(() => {
    if (step === 0) return !!data.channel && !!data.email;
    if (step === 1) return !!data.name && !!data.title && !!data.company && !!data.location && !!data.bio;
    if (step === 2) return data.expertise.trim().split('\n').filter(Boolean).length >= 3 && data.price > 0;
    if (step === 3) return availabilityCount >= 2;
    return true;
  }, [step, data, availabilityCount]);

  const finishOAuth = (channel) => {
    setBusy(true);
    setTimeout(() => {
      const suggestedEmail = `${channel}-mentor@example.com`;
      const nextBadges = channel === 'linkedin' ? ['identity', 'linkedin'] : ['identity'];
      patch({ channel, email: suggestedEmail, badges: nextBadges });
      toast.success(
        channel === 'linkedin'
          ? 'Signed up via LinkedIn. Identity + LinkedIn Verified badges granted.'
          : `Signed up via ${channel}. Identity Verified badge granted.`,
      );
      setBusy(false);
      setStep(1);
    }, 500);
  };

  const useEmailChannel = () => {
    if (!data.email || !data.password) {
      toast.error('Fill email and password to continue.');
      return;
    }
    patch({ channel: 'email' });
    setStep(1);
  };

  const submit = () => {
    setBusy(true);
    setTimeout(() => {
      // Map new mentor onto an existing slot (for demo — real backend would create a new record).
      const mentorId = resolveMentorSlot(data.email);
      const priceValue = Number(data.price) || 1499;
      const expertiseList = data.expertise.split('\n').map((x) => x.trim()).filter(Boolean);
      const availability = DAYS.filter((d) => (data.availability[d] || []).length > 0).map((d) => ({
        day: d,
        slots: data.availability[d],
      }));
      const nameLocal = data.name.trim().split(' ')[0] || 'You';

      const sessionTypes = [
        { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'A quick chemistry check.' },
        { name: '1:1 session', duration: '45 min', price: `₹${priceValue.toLocaleString('en-IN')}`, priceValue, blurb: 'Deep dive into your goal.' },
        { name: 'Mock interview', duration: '60 min', price: `₹${Math.round(priceValue * 1.5).toLocaleString('en-IN')}`, priceValue: Math.round(priceValue * 1.5), blurb: 'Full-loop mock with written feedback.' },
        { name: 'Journey (monthly)', duration: '4 sessions/mo', price: `₹${Math.round(priceValue * 3.2).toLocaleString('en-IN')}`, priceValue: Math.round(priceValue * 3.2), blurb: '4-week structured plan.' },
      ];

      updateMentor(mentorId, {
        name: data.name,
        title: `${data.title}${data.company ? `, ${data.company}` : ''}`,
        domain: data.domain,
        location: data.location,
        tag: data.tag || data.domain,
        bio: data.bio,
        expertise: expertiseList,
        sessionTypes,
        availability: availability.length ? availability : undefined,
        applicationStatus: 'pending',
        verified_badges: data.badges,
      });

      login({
        role: 'mentor',
        email: data.email,
        name: data.name,
        channel: data.channel || 'email',
        mentorId,
        applicationStatus: 'pending',
        verified_badges: data.badges,
      });
      toast.success('Application received. Under review — 5 working days.');
      setBusy(false);
      navigate('/dashboard/mentor');
    }, 700);
  };

  return (
    <div className="relative min-h-screen paper-noise" data-testid="onboarding-mentor-page">
      <Navbar />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-12 lg:px-10 lg:pt-16">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Mentor application &middot; step {step + 1} of {STEP_LABELS.length}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {step === 0 && 'Verify who you are.'}
            {step === 1 && 'Your public profile.'}
            {step === 2 && 'Expertise & session prices.'}
            {step === 3 && 'When are you available?'}
            {step === 4 && (
              <span>
                Almost there &mdash; <span className="italic">review &amp; submit</span>.
              </span>
            )}
          </h1>
          <div className="mt-8">
            <StepIndicator steps={STEP_LABELS} current={step} />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {/* STEP 0 */}
          {step === 0 && (
            <div className="space-y-6" data-testid="mentor-step-identity">
              <p className="text-sm text-navy/70">
                LinkedIn is <strong>strongly encouraged</strong> &mdash; it unlocks the LinkedIn Verified
                badge and speeds up verification.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  data-testid="mentor-oauth-linkedin"
                  onClick={() => finishOAuth('linkedin')}
                  disabled={busy}
                  className="btn-tactile h-14 rounded-none border-2 border-[#0A66C2] bg-[#0A66C2] text-sm font-semibold uppercase tracking-widest text-paper hover:bg-[#0A66C2]"
                >
                  <span className="mr-2 font-bold">in</span> Sign up with LinkedIn
                </Button>
                <Button
                  data-testid="mentor-oauth-google"
                  onClick={() => finishOAuth('google')}
                  disabled={busy}
                  className="btn-tactile h-14 rounded-none border-2 border-navy bg-paper text-sm font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
                >
                  <span className="mr-2 font-bold">G</span> Sign up with Google
                </Button>
              </div>
              <div className="relative py-4">
                <div className="absolute inset-x-0 top-1/2 h-px bg-black/15" />
                <span className="relative mx-auto block w-fit bg-paper px-4 text-[10px] font-semibold uppercase tracking-widest text-navy/50">
                  or use email
                </span>
              </div>
              <div className="space-y-3">
                <Input
                  data-testid="mentor-email"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Input
                  data-testid="mentor-password"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => patch({ password: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Button
                  data-testid="mentor-email-continue"
                  onClick={useEmailChannel}
                  className="btn-tactile h-12 w-full rounded-none border-2 border-navy bg-saffron text-sm font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                >
                  <Mail size={14} className="mr-2" /> Continue with email
                </Button>
              </div>
              {data.badges.length > 0 && (
                <div className="border border-black/15 bg-sand/40 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">Earned so far</div>
                  <div className="mt-2">
                    <VerifiedBadges badges={data.badges} testId="mentor-badges-earned" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 1 — Public profile */}
          {step === 1 && (
            <div className="space-y-4" data-testid="mentor-step-profile">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input data-testid="mentor-p-name" placeholder="Full name" value={data.name} onChange={(e) => patch({ name: e.target.value })} className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
                <Input data-testid="mentor-p-title" placeholder="Current title (e.g. Sr. Engineering Manager)" value={data.title} onChange={(e) => patch({ title: e.target.value })} className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
                <Input data-testid="mentor-p-company" placeholder="Current company" value={data.company} onChange={(e) => patch({ company: e.target.value })} className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
                <Input data-testid="mentor-p-location" placeholder="City" value={data.location} onChange={(e) => patch({ location: e.target.value })} className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
                <Input data-testid="mentor-p-tag" placeholder="Tag (e.g. Backend · Distributed Systems)" value={data.tag} onChange={(e) => patch({ tag: e.target.value })} className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">Domain</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mentorDomains.map((d) => (
                      <button
                        key={d}
                        type="button"
                        data-testid={`mentor-p-domain-${d.toLowerCase().replace(/[&\s]+/g, '-').replace(/-+/g, '-')}`}
                        onClick={() => patch({ domain: d })}
                        className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                          data.domain === d ? 'border-navy bg-navy text-paper' : 'border-black/15 text-navy hover:border-navy'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea data-testid="mentor-p-bio" placeholder="Bio (2-3 short paragraphs)" value={data.bio} onChange={(e) => patch({ bio: e.target.value })} rows={5} className="rounded-none border-2 border-navy bg-paper focus-visible:ring-0" />
            </div>
          )}

          {/* STEP 2 — Expertise & prices */}
          {step === 2 && (
            <div className="space-y-6" data-testid="mentor-step-expertise">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                  Expertise (one per line, minimum 3)
                </div>
                <Textarea
                  data-testid="mentor-e-expertise"
                  placeholder={'e.g.\nSystem design (L4 → L6)\nBackend architecture\nInterview prep'}
                  value={data.expertise}
                  onChange={(e) => patch({ expertise: e.target.value })}
                  rows={7}
                  className="mt-2 rounded-none border-2 border-navy bg-paper font-mono text-sm focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                    Base session price (₹, 45-min 1:1)
                  </div>
                  <Input
                    data-testid="mentor-e-price"
                    type="number"
                    value={data.price}
                    onChange={(e) => patch({ price: Number(e.target.value) || 0 })}
                    className="mt-2 h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                  />
                  <p className="mt-2 text-xs text-navy/50">
                    You keep 80%. Vcharo takes a flat 20% platform fee.
                  </p>
                </div>
                <div className="border border-black/15 bg-sand/40 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                    Free 15-min intro
                  </div>
                  <p className="mt-2 text-sm text-navy/75">
                    Every Vcharo mentor offers a free chemistry-check call. This is a hard platform
                    requirement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Availability */}
          {step === 3 && (
            <div className="space-y-4" data-testid="mentor-step-availability">
              <p className="text-sm text-navy/70">
                Pick at least 2 slots to start &mdash; you can edit this any time from your dashboard.
              </p>
              <div className="space-y-3">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    data-testid={`mentor-a-day-${d.toLowerCase()}`}
                    className="grid grid-cols-[80px_1fr] items-center gap-3 border border-black/15 bg-paper p-4"
                  >
                    <div className="font-serif text-lg font-semibold text-navy">{d}</div>
                    <div className="flex flex-wrap gap-2">
                      {SLOTS.map((s) => {
                        const active = (data.availability[d] || []).includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            data-testid={`mentor-a-slot-${d.toLowerCase()}-${s.replace(/\s+/g, '')}`}
                            onClick={() => toggleSlot(d, s)}
                            className={`border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                              active ? 'border-saffron bg-saffron text-navy' : 'border-black/15 text-navy hover:border-navy'
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-navy/60" data-testid="mentor-a-count">
                Selected: {availabilityCount} slot{availabilityCount === 1 ? '' : 's'}
              </div>
            </div>
          )}

          {/* STEP 4 — Review */}
          {step === 4 && (
            <div className="space-y-6" data-testid="mentor-step-review">
              <div className="border-2 border-navy bg-navy p-6 text-paper">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-saffron" />
                  <div className="text-xs font-semibold uppercase tracking-widest text-saffron">Under review</div>
                </div>
                <div className="mt-3 font-serif text-xl">
                  Your application will be reviewed by the Vcharo Trust team in <strong>5 working days</strong>.
                </div>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  Your profile is <em>saved</em> but not yet visible to mentees. We check employment,
                  references, and run a short intro call before you go live.
                </p>
                <div className="mt-5">
                  <VerifiedBadges badges={data.badges} testId="mentor-review-badges" />
                </div>
              </div>

              <div className="border border-black/15 bg-paper p-6" data-testid="mentor-review-summary">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ['Name', data.name],
                    ['Email', data.email],
                    ['Title', data.title],
                    ['Company', data.company],
                    ['Domain', data.domain],
                    ['City', data.location],
                    ['Base price', `₹${Number(data.price).toLocaleString('en-IN')} / session`],
                    ['Availability', `${availabilityCount} slot${availabilityCount === 1 ? '' : 's'}`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">{k}</dt>
                      <dd className="mt-1 text-sm text-navy">{v || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6">
            <Button
              data-testid="mentor-onb-back"
              variant="ghost"
              disabled={step === 0 || busy}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-none border-2 border-black/20 bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy disabled:opacity-30"
            >
              <ArrowLeft size={14} className="mr-1.5" /> Back
            </Button>

            {step < STEP_LABELS.length - 1 ? (
              <Button
                data-testid="mentor-onb-next"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed || busy}
                className="btn-tactile rounded-none border-2 border-navy bg-saffron px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron disabled:opacity-40"
              >
                Continue <ArrowRight size={14} className="ml-1.5" />
              </Button>
            ) : (
              <Button
                data-testid="mentor-onb-submit"
                onClick={submit}
                disabled={busy}
                className="btn-tactile rounded-none border-2 border-navy bg-saffron px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : (<>Submit application <ArrowRight size={14} className="ml-1.5" /></>)}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
