import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Loader2, Github, Upload, Mail } from 'lucide-react';
import Navbar from '../components/vcharo/Navbar';
import Footer from '../components/vcharo/Footer';
import StepIndicator from '../components/vcharo/onboarding/StepIndicator';
import VerifiedBadges from '../components/vcharo/VerifiedBadges';
import { Toaster } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useSession } from '../lib/session';
import { writeMenteeProfile, defaultMenteeProfile } from '../lib/menteeStore';
import { mentorDomains, mentorLanguages } from '../data/vcharo';
import { mockGithubRepos } from '../data/dashboard';

const STEP_LABELS = ['Identity', 'Basics', 'Preferences', 'Bonuses'];

export default function OnboardingMenteePage() {
  const navigate = useNavigate();
  const { login } = useSession();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState(() => ({
    ...defaultMenteeProfile,
    channel: null,        // 'google' | 'linkedin' | 'email'
    email: '',
    password: '',
    badges: [],
  }));

  const patch = (p) => setData((d) => ({ ...d, ...p }));
  const toggle = (key, value) => {
    const list = new Set(data[key]);
    if (list.has(value)) list.delete(value);
    else list.add(value);
    patch({ [key]: Array.from(list) });
  };

  const canProceed = useMemo(() => {
    if (step === 0) return !!data.channel && !!data.email;
    if (step === 1) return !!data.name && !!data.city && !!data.currentRole && !!data.goal;
    if (step === 2) return data.domains.length > 0 && data.languages.length > 0 && data.budget > 0;
    return true;
  }, [step, data]);

  const finishOAuth = (channel) => {
    setBusy(true);
    setTimeout(() => {
      const suggestedEmail = `${channel}-user@example.com`;
      patch({
        channel,
        email: suggestedEmail,
        name: 'New Mentee',
        badges: ['identity'],
      });
      toast.success(`Signed up via ${channel}. Identity Verified badge granted.`);
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

  const finish = () => {
    setBusy(true);
    setTimeout(() => {
      // Persist mentee profile (excluding transient fields).
      const { password, channel, badges, ...profile } = data;
      writeMenteeProfile(profile);
      login({
        role: 'mentee',
        email: data.email,
        name: data.name || 'Mentee',
        channel: channel || 'email',
        verified_badges: badges,
      });
      toast.success('Welcome to Vcharo. Your dashboard is ready.');
      setBusy(false);
      navigate('/dashboard/mentee');
    }, 600);
  };

  return (
    <div className="relative min-h-screen paper-noise" data-testid="onboarding-mentee-page">
      <Navbar />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-12 lg:px-10 lg:pt-16">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Mentee onboarding &middot; step {step + 1} of {STEP_LABELS.length}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {step === 0 && 'First, tell us who you are.'}
            {step === 1 && 'A few basics.'}
            {step === 2 && 'What are you looking for?'}
            {step === 3 && (
              <span>
                Optional <span className="italic">bonuses</span>.
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
          {/* STEP 0 — Identity */}
          {step === 0 && (
            <div className="space-y-6" data-testid="mentee-step-identity">
              <p className="text-sm text-navy/70">
                Sign up with Google or LinkedIn to unlock an <strong>Identity Verified</strong> badge, or
                use email + password.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  data-testid="mentee-oauth-google"
                  onClick={() => finishOAuth('google')}
                  disabled={busy}
                  className="btn-tactile h-14 rounded-none border-2 border-navy bg-paper text-sm font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
                >
                  <span className="mr-2 font-bold">G</span> Sign up with Google
                </Button>
                <Button
                  data-testid="mentee-oauth-linkedin"
                  onClick={() => finishOAuth('linkedin')}
                  disabled={busy}
                  className="btn-tactile h-14 rounded-none border-2 border-[#0A66C2] bg-[#0A66C2] text-sm font-semibold uppercase tracking-widest text-paper hover:bg-[#0A66C2]"
                >
                  <span className="mr-2 font-bold">in</span> Sign up with LinkedIn
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
                  data-testid="mentee-email"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Input
                  data-testid="mentee-password"
                  type="password"
                  placeholder="Password (any 6+ characters for demo)"
                  value={data.password}
                  onChange={(e) => patch({ password: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Button
                  data-testid="mentee-email-continue"
                  onClick={useEmailChannel}
                  className="btn-tactile h-12 w-full rounded-none border-2 border-navy bg-saffron text-sm font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                >
                  <Mail size={14} className="mr-2" /> Continue with email
                </Button>
              </div>
              {data.badges.length > 0 && (
                <div className="border border-black/15 bg-sand/40 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                    Earned so far
                  </div>
                  <div className="mt-2">
                    <VerifiedBadges badges={data.badges} testId="mentee-badges-earned" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 1 — Basics */}
          {step === 1 && (
            <div className="space-y-4" data-testid="mentee-step-basics">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  data-testid="mentee-basics-name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Input
                  data-testid="mentee-basics-city"
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => patch({ city: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Input
                  data-testid="mentee-basics-role"
                  placeholder="Current role or student status"
                  value={data.currentRole}
                  onChange={(e) => patch({ currentRole: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
                <Input
                  data-testid="mentee-basics-goal"
                  placeholder="Your career goal"
                  value={data.goal}
                  onChange={(e) => patch({ goal: e.target.value })}
                  className="h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
              </div>
            </div>
          )}

          {/* STEP 2 — Preferences */}
          {step === 2 && (
            <div className="space-y-6" data-testid="mentee-step-prefs">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                  Preferred domains
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mentorDomains.map((d) => {
                    const active = data.domains.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        data-testid={`mentee-onb-domain-${d.toLowerCase().replace(/[&\s]+/g, '-').replace(/-+/g, '-')}`}
                        onClick={() => toggle('domains', d)}
                        className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active ? 'border-navy bg-navy text-paper' : 'border-black/15 text-navy hover:border-navy'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                  Languages
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mentorLanguages.map((l) => {
                    const active = data.languages.includes(l);
                    return (
                      <button
                        key={l}
                        type="button"
                        data-testid={`mentee-onb-lang-${l}`}
                        onClick={() => toggle('languages', l)}
                        className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active ? 'border-navy bg-navy text-paper' : 'border-black/15 text-navy hover:border-navy'
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                    Budget per session (₹)
                  </div>
                  <Input
                    data-testid="mentee-onb-budget"
                    type="number"
                    value={data.budget}
                    onChange={(e) => patch({ budget: Number(e.target.value) || 0 })}
                    className="mt-2 h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
                    Availability
                  </div>
                  <Input
                    data-testid="mentee-onb-availability"
                    placeholder="Weekday evenings IST"
                    value={data.availability}
                    onChange={(e) => patch({ availability: e.target.value })}
                    className="mt-2 h-12 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Bonuses */}
          {step === 3 && (
            <div className="space-y-6" data-testid="mentee-step-bonuses">
              <p className="text-sm text-navy/70">
                All optional &mdash; skip anything, add later from your dashboard.
              </p>

              <div className="border border-black/15 bg-paper p-6">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-saffron">Resume</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-navy">
                      {data.resume ? data.resume.name : 'Upload PDF / DOCX (under 8MB)'}
                    </div>
                    <div className="mt-0.5 text-xs text-navy/50">
                      Only mentors you connect with can see it.
                    </div>
                  </div>
                  <label
                    data-testid="mentee-onb-resume-label"
                    className="inline-flex cursor-pointer items-center gap-2 border-2 border-navy bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
                  >
                    <Upload size={13} /> {data.resume ? 'Replace' : 'Choose file'}
                    <input
                      data-testid="mentee-onb-resume-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) patch({ resume: { name: f.name, size: f.size, uploadedAt: new Date().toISOString() } });
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="border border-black/15 bg-paper p-6">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-saffron">GitHub</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-navy">
                    {data.githubUser
                      ? `Connected as @${data.githubUser}. Pick up to 4 repos in your dashboard.`
                      : 'Show mentors the code you have shipped.'}
                  </div>
                  {!data.githubUser && (
                    <Button
                      data-testid="mentee-onb-github-connect"
                      onClick={() => {
                        const handle = (data.email || 'mentee').split('@')[0];
                        patch({ githubUser: handle, selectedRepos: mockGithubRepos.slice(0, 2).map((r) => r.id) });
                        toast.success(`Connected as @${handle} (demo).`);
                      }}
                      className="rounded-none border-2 border-navy bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper hover:bg-saffron hover:text-navy hover:border-saffron"
                    >
                      <Github size={13} className="mr-1.5" /> Connect (demo)
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">Short bio</div>
                <Textarea
                  data-testid="mentee-onb-bio"
                  placeholder="2-3 lines: what you want out of mentorship"
                  value={data.bio}
                  onChange={(e) => patch({ bio: e.target.value })}
                  rows={4}
                  className="mt-2 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                />
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6">
            <Button
              data-testid="mentee-onb-back"
              variant="ghost"
              disabled={step === 0 || busy}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-none border-2 border-black/20 bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy disabled:opacity-30"
            >
              <ArrowLeft size={14} className="mr-1.5" /> Back
            </Button>

            {step < STEP_LABELS.length - 1 ? (
              <Button
                data-testid="mentee-onb-next"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed || busy}
                className="btn-tactile rounded-none border-2 border-navy bg-saffron px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron disabled:opacity-40"
              >
                Continue <ArrowRight size={14} className="ml-1.5" />
              </Button>
            ) : (
              <Button
                data-testid="mentee-onb-finish"
                onClick={finish}
                disabled={busy}
                className="btn-tactile rounded-none border-2 border-navy bg-saffron px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : (<>Finish &amp; open dashboard <ArrowRight size={14} className="ml-1.5" /></>)}
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
