import { useMemo, useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Upload,
  Github,
  Star,
  Trash2,
  Pencil,
  Save,
  X as XIcon,
  Sparkles,
} from 'lucide-react';
import DashboardShell from '../components/vcharo/dashboard/DashboardShell';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useSession } from '../lib/session';
import { readMenteeProfile, writeMenteeProfile } from '../lib/menteeStore';
import { mockGithubRepos } from '../data/dashboard';
import { mentors as staticMentors, mentorDomains, mentorLanguages } from '../data/vcharo';
import VerifiedBadges from '../components/vcharo/VerifiedBadges';

const SectionHeader = ({ eyebrow, title, action }) => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-saffron">{eyebrow}</div>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
    </div>
    {action}
  </div>
);

// -------------------- Profile card --------------------
const ProfileCard = ({ profile, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  useEffect(() => setDraft(profile), [profile]);

  const toggle = (key, value) => {
    const list = new Set(draft[key]);
    list.has(value) ? list.delete(value) : list.add(value);
    setDraft({ ...draft, [key]: Array.from(list) });
  };

  return (
    <section id="profile" className="border border-black/15 bg-paper p-8">
      <SectionHeader
        eyebrow="Your profile"
        title="What mentors will see about you"
        action={
          editing ? (
            <div className="flex gap-2">
              <Button
                data-testid="mentee-profile-cancel"
                onClick={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
                variant="ghost"
                className="rounded-none border-2 border-black/20 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy"
              >
                <XIcon size={14} className="mr-1" /> Cancel
              </Button>
              <Button
                data-testid="mentee-profile-save"
                onClick={() => {
                  onSave(draft);
                  setEditing(false);
                }}
                className="rounded-none border-2 border-navy bg-saffron px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
              >
                <Save size={14} className="mr-1" /> Save
              </Button>
            </div>
          ) : (
            <Button
              data-testid="mentee-profile-edit"
              onClick={() => setEditing(true)}
              className="rounded-none border-2 border-navy bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
            >
              <Pencil size={14} className="mr-1" /> Edit
            </Button>
          )
        }
      />

      {!editing ? (
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ['Name', profile.name || '—'],
            ['City', profile.city || '—'],
            ['Current role', profile.currentRole || '—'],
            ['Goal', profile.goal || '—'],
            ['Preferred domains', profile.domains.join(', ') || '—'],
            ['Languages', profile.languages.join(', ') || '—'],
            ['Budget / session', `₹${profile.budget}`],
            ['Availability', profile.availability || '—'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">{k}</dt>
              <dd className="mt-1 text-sm text-navy">{v}</dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Bio</dt>
            <dd className="mt-1 text-sm leading-relaxed text-navy/80" data-testid="mentee-profile-bio">
              {profile.bio || 'Add a short pitch — what do you want out of mentorship?'}
            </dd>
          </div>
        </dl>
      ) : (
        <div className="space-y-4" data-testid="mentee-profile-edit-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              data-testid="mentee-input-name"
              placeholder="Your name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
            <Input
              data-testid="mentee-input-city"
              placeholder="City"
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
            <Input
              data-testid="mentee-input-role"
              placeholder="Current role or student status"
              value={draft.currentRole}
              onChange={(e) => setDraft({ ...draft, currentRole: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
            <Input
              data-testid="mentee-input-goal"
              placeholder="Your career goal"
              value={draft.goal}
              onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
            <Input
              data-testid="mentee-input-budget"
              type="number"
              placeholder="Budget per session (₹)"
              value={draft.budget}
              onChange={(e) => setDraft({ ...draft, budget: Number(e.target.value) || 0 })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
            <Input
              data-testid="mentee-input-availability"
              placeholder="Availability (e.g. Weekday evenings IST)"
              value={draft.availability}
              onChange={(e) => setDraft({ ...draft, availability: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper text-navy focus-visible:ring-0"
            />
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Domains</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentorDomains.map((d) => {
                const active = draft.domains.includes(d);
                return (
                  <button
                    key={d}
                    data-testid={`mentee-domain-${d.toLowerCase().replace(/[&\s]+/g, '-').replace(/-+/g, '-')}`}
                    type="button"
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
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Languages</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentorLanguages.map((l) => {
                const active = draft.languages.includes(l);
                return (
                  <button
                    key={l}
                    data-testid={`mentee-lang-${l}`}
                    type="button"
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

          <Textarea
            data-testid="mentee-input-bio"
            placeholder="What do you want to get out of mentorship? (2–3 lines)"
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
            className="rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            rows={4}
          />
        </div>
      )}
    </section>
  );
};

// -------------------- Resume card --------------------
const ResumeCard = ({ resume, onUpload, onRemove }) => (
  <section id="resume" className="border border-black/15 bg-paper p-8">
    <SectionHeader eyebrow="Resume" title="Upload your resume" />
    {!resume ? (
      <label
        data-testid="mentee-resume-upload-label"
        className="flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-navy/30 bg-sand/40 px-6 py-12 text-center hover:border-navy"
      >
        <Upload size={22} className="text-saffron" />
        <div className="text-sm font-medium text-navy">Click to choose a PDF or DOCX</div>
        <div className="text-xs text-navy/50">Under 8MB. Stored locally in this demo.</div>
        <input
          data-testid="mentee-resume-input"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload({ name: f.name, size: f.size, uploadedAt: new Date().toISOString() });
          }}
        />
      </label>
    ) : (
      <div
        className="flex items-center justify-between border border-black/15 bg-sand/40 px-5 py-4"
        data-testid="mentee-resume-uploaded"
      >
        <div>
          <div className="font-medium text-navy">{resume.name}</div>
          <div className="mt-0.5 text-xs text-navy/60">
            {(resume.size / 1024).toFixed(1)} KB · Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
          </div>
        </div>
        <Button
          data-testid="mentee-resume-remove"
          onClick={onRemove}
          variant="ghost"
          className="rounded-none border border-black/15 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:border-red-500 hover:text-red-500"
        >
          <Trash2 size={14} className="mr-1" /> Remove
        </Button>
      </div>
    )}
  </section>
);

// -------------------- GitHub card --------------------
const GithubCard = ({ profile, onConnect, onToggleRepo }) => {
  const connected = !!profile.githubUser;
  return (
    <section id="github" className="border border-black/15 bg-paper p-8">
      <SectionHeader
        eyebrow="GitHub"
        title={connected ? `Connected as @${profile.githubUser}` : 'Connect your GitHub'}
        action={
          !connected && (
            <Button
              data-testid="mentee-github-connect"
              onClick={onConnect}
              className="rounded-none border-2 border-navy bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper hover:bg-saffron hover:text-navy hover:border-saffron"
            >
              <Github size={14} className="mr-1.5" /> Connect (demo)
            </Button>
          )
        }
      />
      {!connected ? (
        <p className="text-sm text-navy/70">
          Show mentors the code you have already shipped. Connect once, pick up to 4 repos to spotlight on your profile.
        </p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-navy/70">
            Pick up to <span className="font-semibold text-navy">4</span> repos to showcase.
            Selected: {profile.selectedRepos.length}
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2" data-testid="mentee-github-repos">
            {mockGithubRepos.map((r) => {
              const active = profile.selectedRepos.includes(r.id);
              return (
                <button
                  key={r.id}
                  data-testid={`mentee-github-repo-${r.id}`}
                  onClick={() => onToggleRepo(r.id)}
                  className={`border p-5 text-left transition-colors ${
                    active ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy hover:border-navy'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-sm font-semibold">{r.name}</div>
                      <div className={`mt-1 text-[10px] uppercase tracking-widest ${active ? 'text-saffron' : 'text-saffron'}`}>
                        {r.language} · {r.updated}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-sm">
                      <Star size={12} fill="#F57A00" stroke="#F57A00" /> {r.stars}
                    </div>
                  </div>
                  <p className={`mt-3 text-xs leading-relaxed ${active ? 'text-paper/80' : 'text-navy/70'}`}>
                    {r.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

// -------------------- Matched mentors --------------------
const MatchedMentors = ({ profile }) => {
  const matches = useMemo(() => {
    const scored = staticMentors.map((m) => {
      let score = 0;
      if (profile.domains.length && profile.domains.includes(m.domain)) score += 3;
      if (profile.languages.some((l) => m.languages.includes(l))) score += 1;
      if (m.priceValue <= profile.budget + 200) score += 2;
      return { m, score };
    });
    return scored
      .sort((a, b) => b.score - a.score || b.m.rating - a.m.rating)
      .slice(0, 3)
      .map((s) => s.m);
  }, [profile]);

  return (
    <section id="matches" className="border border-black/15 bg-paper p-8">
      <SectionHeader
        eyebrow="Matches"
        title="Mentors that fit your profile"
        action={
          <Link
            data-testid="mentee-view-all-mentors"
            to="/mentors"
            className="text-xs font-semibold uppercase tracking-widest text-saffron hover:underline"
          >
            View all →
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-testid="mentee-matched-mentors">
        {matches.map((m) => (
          <Link
            key={m.id}
            to={`/mentors/${m.id}`}
            data-testid={`mentee-match-${m.id}`}
            className="group border border-black/15 bg-paper transition-colors hover:border-navy"
          >
            <img src={m.photo} alt={m.name} className="h-40 w-full object-cover object-top" loading="lazy" />
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-widest text-saffron">{m.domain}</div>
              <div className="mt-2 font-serif text-lg font-semibold text-navy group-hover:text-saffron">{m.name}</div>
              <div className="text-xs text-navy/70">{m.title}</div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-navy">★ {m.rating}</span>
                <span className="font-serif font-semibold text-navy">{m.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// -------------------- Sessions --------------------
const SessionsCard = () => (
  <section id="sessions" className="border border-black/15 bg-paper p-8">
    <SectionHeader eyebrow="Sessions" title="Your mentorship journey" />
    <div className="border-2 border-dashed border-navy/25 bg-sand/40 p-10 text-center" data-testid="mentee-sessions-empty">
      <Sparkles size={20} className="mx-auto text-saffron" />
      <div className="mt-3 font-serif text-xl font-semibold text-navy">No sessions yet.</div>
      <p className="mt-2 text-sm text-navy/70">Book your first mentor above — the free 15-min intro is on the house.</p>
      <Link
        to="/mentors"
        data-testid="mentee-book-first-mentor"
        className="mt-6 inline-flex items-center gap-2 border-2 border-navy bg-saffron px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy btn-tactile"
      >
        Browse mentors
      </Link>
    </div>
  </section>
);

// -------------------- Page --------------------
export default function MenteeDashboardPage() {
  const { user, isAuthed } = useSession();
  const [profile, setProfile] = useState(readMenteeProfile);

  useEffect(() => {
    if (user && !profile.name) {
      setProfile(writeMenteeProfile({ name: user.name }));
    }
  }, [user]);

  if (!isAuthed) return <Navigate to="/" replace />;
  if (user.role !== 'mentee') return <Navigate to="/dashboard/mentor" replace />;

  const saveProfile = (patch) => {
    const next = writeMenteeProfile(patch);
    setProfile(next);
    toast.success('Profile updated.');
  };

  const uploadResume = (meta) => {
    setProfile(writeMenteeProfile({ resume: meta }));
    toast.success('Resume saved to your profile.');
  };
  const removeResume = () => {
    setProfile(writeMenteeProfile({ resume: null }));
    toast.info('Resume removed.');
  };

  const connectGithub = () => {
    const handle = (user.email || 'mentee').split('@')[0];
    setProfile(writeMenteeProfile({ githubUser: handle }));
    toast.success(`Connected as @${handle} (demo).`);
  };
  const toggleRepo = (id) => {
    const list = new Set(profile.selectedRepos);
    if (list.has(id)) list.delete(id);
    else if (list.size >= 4) {
      toast.error('You can showcase up to 4 repos.');
      return;
    } else list.add(id);
    setProfile(writeMenteeProfile({ selectedRepos: Array.from(list) }));
  };

  return (
    <DashboardShell
      testId="mentee-dashboard"
      title={`नमस्ते, ${(profile.name || user.name || 'friend').split(' ')[0]}.`}
      subtitle="Everything a mentor needs to know about you, in one place."
      sidebar={[
        { to: '#profile', label: 'Profile', testId: 'mentee-nav-profile' },
        { to: '#resume', label: 'Resume', testId: 'mentee-nav-resume' },
        { to: '#github', label: 'GitHub', testId: 'mentee-nav-github' },
        { to: '#matches', label: 'Matches', testId: 'mentee-nav-matches' },
        { to: '#sessions', label: 'Sessions', testId: 'mentee-nav-sessions' },
      ]}
    >
      <div className="space-y-8">
        {user.verified_badges && user.verified_badges.length > 0 && (
          <div
            data-testid="mentee-badges-banner"
            className="flex items-center justify-between border border-black/15 bg-sand/40 px-6 py-4"
          >
            <div className="text-sm text-navy">
              You&apos;re signed in as <strong>{user.name || 'Mentee'}</strong>
            </div>
            <VerifiedBadges badges={user.verified_badges} testId="mentee-verified-badges" />
          </div>
        )}
        <ProfileCard profile={profile} onSave={saveProfile} />
        <ResumeCard resume={profile.resume} onUpload={uploadResume} onRemove={removeResume} />
        <GithubCard profile={profile} onConnect={connectGithub} onToggleRepo={toggleRepo} />
        <MatchedMentors profile={profile} />
        <SessionsCard />
      </div>
    </DashboardShell>
  );
}
