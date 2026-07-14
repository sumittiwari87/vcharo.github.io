import { useMemo, useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Pencil, Save, X as XIcon, Send, Check, Trash2, ExternalLink, Clock } from 'lucide-react';
import DashboardShell from '../components/vcharo/dashboard/DashboardShell';
import VerifiedBadges from '../components/vcharo/VerifiedBadges';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { useSession } from '../lib/session';
import { getMentor, updateMentor } from '../lib/mentorStore';
import {
  listRequests,
  createRequest,
  updateRequestStatus,
  subscribeRequests,
} from '../lib/requestsStore';
import { mockMentees, seedIncomingRequests, seedAcceptedRequests } from '../data/dashboard';
import { mentors as staticMentors } from '../data/vcharo';

const SectionHeader = ({ eyebrow, title, action }) => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-saffron">{eyebrow}</div>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
    </div>
    {action}
  </div>
);

// Choose which mentor profile this account owns.
// Default rule: link email prefix to a mentor id; fallback to first mentor.
const resolveMentorId = (email) => {
  const map = { aarav: 'm1', nandini: 'm2', vikram: 'm3', priya: 'm4' };
  const prefix = (email || '').split('@')[0].split(/[.-_+]/)[0].toLowerCase();
  return map[prefix] || 'm1';
};

// -------------------- Editable profile --------------------
const EditableProfile = ({ mentorId, mentor, onSaved }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: mentor.title,
    bio: mentor.bio,
    tag: mentor.tag,
    location: mentor.location,
    responseTime: mentor.responseTime,
    expertise: [...mentor.expertise],
    sessionTypes: mentor.sessionTypes.map((s) => ({ ...s })),
    availability: mentor.availability.map((a) => ({ ...a, slots: [...a.slots] })),
  });

  useEffect(() => {
    setDraft({
      title: mentor.title,
      bio: mentor.bio,
      tag: mentor.tag,
      location: mentor.location,
      responseTime: mentor.responseTime,
      expertise: [...mentor.expertise],
      sessionTypes: mentor.sessionTypes.map((s) => ({ ...s })),
      availability: mentor.availability.map((a) => ({ ...a, slots: [...a.slots] })),
    });
  }, [mentor]);

  const save = () => {
    updateMentor(mentorId, draft);
    onSaved();
    setEditing(false);
    toast.success('Public profile updated.');
  };

  return (
    <section id="profile" className="border border-black/15 bg-paper p-8">
      <SectionHeader
        eyebrow="Your public profile"
        title="Everything mentees see about you"
        action={
          <div className="flex items-center gap-2">
            <Link
              data-testid="mentor-view-public-profile"
              to={`/mentors/${mentorId}`}
              className="inline-flex items-center gap-2 border border-black/15 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:border-navy"
            >
              <ExternalLink size={13} /> View public
            </Link>
            {editing ? (
              <>
                <Button
                  data-testid="mentor-profile-cancel"
                  onClick={() => setEditing(false)}
                  variant="ghost"
                  className="rounded-none border-2 border-black/20 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy"
                >
                  <XIcon size={14} className="mr-1" /> Cancel
                </Button>
                <Button
                  data-testid="mentor-profile-save"
                  onClick={save}
                  className="rounded-none border-2 border-navy bg-saffron px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                >
                  <Save size={14} className="mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button
                data-testid="mentor-profile-edit"
                onClick={() => setEditing(true)}
                className="rounded-none border-2 border-navy bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
              >
                <Pencil size={14} className="mr-1" /> Edit
              </Button>
            )}
          </div>
        }
      />

      {!editing ? (
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ['Title', mentor.title],
            ['Domain', mentor.domain],
            ['Tag', mentor.tag],
            ['Location', mentor.location],
            ['Response time', mentor.responseTime],
            ['Base price', mentor.sessionTypes[1]?.price || '—'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">{k}</dt>
              <dd className="mt-1 text-sm text-navy">{v}</dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Bio</dt>
            <dd className="mt-1 text-sm leading-relaxed text-navy/80">{mentor.bio}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Expertise</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {mentor.expertise.map((e) => (
                <span key={e} className="border border-black/15 bg-sand/40 px-2.5 py-1 text-xs text-navy">
                  {e}
                </span>
              ))}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Session types & prices</dt>
            <dd className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {mentor.sessionTypes.map((s, i) => (
                <div key={i} className="flex items-center justify-between border border-black/10 px-3 py-2 text-sm">
                  <span className="text-navy">{s.name} · {s.duration}</span>
                  <span className="font-serif font-semibold text-navy">{s.price}</span>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      ) : (
        <div className="space-y-5" data-testid="mentor-profile-edit-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              data-testid="mentor-edit-title"
              placeholder="Title (e.g. Sr. Engineering Manager, Razorpay)"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            />
            <Input
              data-testid="mentor-edit-tag"
              placeholder="Tag (e.g. Backend · Distributed Systems)"
              value={draft.tag}
              onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            />
            <Input
              data-testid="mentor-edit-location"
              placeholder="Location"
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            />
            <Input
              data-testid="mentor-edit-response"
              placeholder="Typical response time"
              value={draft.responseTime}
              onChange={(e) => setDraft({ ...draft, responseTime: e.target.value })}
              className="h-11 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            />
          </div>
          <Textarea
            data-testid="mentor-edit-bio"
            placeholder="Bio (2-3 paragraphs)"
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
            className="rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
            rows={5}
          />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">
              Expertise (one per line)
            </div>
            <Textarea
              data-testid="mentor-edit-expertise"
              value={draft.expertise.join('\n')}
              onChange={(e) =>
                setDraft({ ...draft, expertise: e.target.value.split('\n').map((x) => x.trim()).filter(Boolean) })
              }
              className="mt-2 rounded-none border-2 border-navy bg-paper font-mono text-sm focus-visible:ring-0"
              rows={5}
            />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-2">
              Session prices
            </div>
            <div className="space-y-2">
              {draft.sessionTypes.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_120px_140px] items-center gap-2">
                  <div className="text-sm text-navy">{s.name} · {s.duration}</div>
                  <Input
                    data-testid={`mentor-edit-price-value-${i}`}
                    type="number"
                    value={s.priceValue}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      const arr = [...draft.sessionTypes];
                      arr[i] = {
                        ...arr[i],
                        priceValue: val,
                        price: val === 0 ? 'Free' : `₹${val.toLocaleString('en-IN')}`,
                      };
                      setDraft({ ...draft, sessionTypes: arr });
                    }}
                    className="h-10 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
                    disabled={s.priceValue === 0}
                  />
                  <div className="text-xs text-navy/60">{s.priceValue === 0 ? 'Free intro (locked)' : `Display: ${s.price}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// -------------------- Send request dialog --------------------
const SendRequestDialog = ({ open, onOpenChange, mentee, mentor, mentorId, onSent }) => {
  const publicPrice = mentor.sessionTypes[1]?.priceValue || 0;
  const [price, setPrice] = useState(publicPrice);
  const [note, setNote] = useState('');

  useEffect(() => {
    setPrice(publicPrice);
    setNote('');
  }, [mentee, publicPrice]);

  if (!mentee) return null;

  const invalid = price > publicPrice;

  const submit = () => {
    if (invalid) {
      toast.error(`You can only offer at or below your public price (₹${publicPrice}).`);
      return;
    }
    createRequest({
      direction: 'mentor->mentee',
      mentorId,
      menteeId: mentee.id,
      customPrice: price,
      note,
    });
    onSent();
    toast.success(`Request sent to ${mentee.name} at ₹${price}.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="mentor-send-dialog" className="max-w-md rounded-none border-2 border-navy bg-paper p-8">
        <DialogHeader className="text-left">
          <DialogTitle className="font-serif text-2xl font-bold text-navy">
            Connect with {mentee.name.split(' ')[0]}
          </DialogTitle>
          <DialogDescription className="text-sm text-navy/70">
            Set a discounted price (must be ≤ your public price of ₹{publicPrice.toLocaleString('en-IN')}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">
              Your offer (₹)
            </div>
            <Input
              data-testid="mentor-send-price-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className={`mt-2 h-11 rounded-none border-2 bg-paper text-navy focus-visible:ring-0 ${invalid ? 'border-red-500' : 'border-navy'}`}
            />
            {invalid && (
              <div className="mt-1 text-xs text-red-500" data-testid="mentor-send-price-error">
                Above your public price. Offer must be ≤ ₹{publicPrice.toLocaleString('en-IN')}.
              </div>
            )}
            <div className="mt-1 text-xs text-navy/50">
              You can offer a discount but not charge above your public price.
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/50">Personal note</div>
            <Textarea
              data-testid="mentor-send-note-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why do you want to work with this mentee? (optional)"
              className="mt-2 rounded-none border-2 border-navy bg-paper focus-visible:ring-0"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            data-testid="mentor-send-cancel"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-none border-2 border-black/20 bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy"
          >
            Cancel
          </Button>
          <Button
            data-testid="mentor-send-submit"
            onClick={submit}
            className="rounded-none border-2 border-navy bg-saffron px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
          >
            <Send size={13} className="mr-1.5" /> Send request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// -------------------- Page --------------------
export default function MentorDashboardPage() {
  const { user, isAuthed } = useSession();
  const mentorId = useMemo(() => resolveMentorId(user?.email), [user]);
  const [mentor, setMentor] = useState(() => getMentor(mentorId));
  const [dialogMentee, setDialogMentee] = useState(null);
  const [, forceTick] = useState(0);
  const bump = () => forceTick((x) => x + 1);

  // Seed the requests store the first time a mentor lands on the dashboard
  useEffect(() => {
    if (!isAuthed) return;
    const existing = listRequests({ mentorId });
    if (existing.length === 0) {
      seedIncomingRequests(mentorId).forEach((r) => createRequest(r));
      seedAcceptedRequests(mentorId).forEach((r) => createRequest(r));
    }
    const unsub = subscribeRequests(bump);
    return unsub;
  }, [isAuthed, mentorId]);

  useEffect(() => {
    setMentor(getMentor(mentorId));
  }, [mentorId]);

  if (!isAuthed) return <Navigate to="/" replace />;
  if (user.role !== 'mentor') return <Navigate to="/dashboard/mentee" replace />;
  if (!mentor) return null;

  const requests = listRequests({ mentorId });
  const incoming = requests.filter((r) => r.direction === 'mentee->mentor' && r.status === 'pending');
  const currentMentees = requests.filter((r) => r.status === 'accepted');
  const sent = requests.filter((r) => r.direction === 'mentor->mentee');

  const acceptedMenteeIds = new Set(currentMentees.map((r) => r.menteeId));
  const potential = mockMentees.filter(
    (m) => m.domains.includes(mentor.domain) && !acceptedMenteeIds.has(m.id),
  );

  const findMentee = (id) => mockMentees.find((m) => m.id === id);

  return (
    <DashboardShell
      testId="mentor-dashboard"
      title={`स्वागत, ${(user.name || mentor.name).split(' ')[0]}.`}
      subtitle="Your public profile, potential mentees, and every request in one place."
      sidebar={[
        { to: '#profile', label: 'Profile', testId: 'mentor-nav-profile' },
        { to: '#potential', label: 'Potential', testId: 'mentor-nav-potential', count: potential.length },
        { to: '#current', label: 'Current', testId: 'mentor-nav-current', count: currentMentees.length },
        { to: '#incoming', label: 'Requests', testId: 'mentor-nav-incoming', count: incoming.length },
        { to: '#sent', label: 'Sent', testId: 'mentor-nav-sent', count: sent.length },
      ]}
    >
      <div className="space-y-8">
        {user.applicationStatus === 'pending' && (
          <div
            data-testid="mentor-under-review-banner"
            className="border-2 border-navy bg-navy p-6 text-paper"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-saffron" />
              <div className="text-xs font-semibold uppercase tracking-widest text-saffron">
                Application under review
              </div>
            </div>
            <div className="mt-3 font-serif text-xl">
              You&apos;re not yet visible to mentees. Trust team decision within 5 working days.
            </div>
            {user.verified_badges && user.verified_badges.length > 0 && (
              <div className="mt-5">
                <VerifiedBadges badges={user.verified_badges} testId="mentor-under-review-badges" />
              </div>
            )}
          </div>
        )}

        <EditableProfile
          mentorId={mentorId}
          mentor={mentor}
          onSaved={() => setMentor(getMentor(mentorId))}
        />

        {/* Potential mentees */}
        <section id="potential" className="border border-black/15 bg-paper p-8">
          <SectionHeader eyebrow="Potential mentees" title={`Matches in ${mentor.domain}`} />
          {potential.length === 0 ? (
            <p className="text-sm text-navy/60">No potential mentees in your domain right now.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2" data-testid="mentor-potential-list">
              {potential.map((me) => (
                <div key={me.id} data-testid={`mentor-potential-${me.id}`} className="flex gap-4 border border-black/15 bg-paper p-5">
                  <img src={me.photo} alt={me.name} className="h-16 w-16 object-cover object-top" />
                  <div className="flex-1">
                    <div className="font-serif text-lg font-semibold text-navy">{me.name}</div>
                    <div className="text-xs text-navy/60">{me.currentRole}</div>
                    <p className="mt-2 line-clamp-2 text-xs text-navy/75">{me.goal}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-navy/60">Budget · ₹{me.budget}</span>
                      <Button
                        data-testid={`mentor-send-${me.id}`}
                        onClick={() => setDialogMentee(me)}
                        className="rounded-none border border-navy bg-navy px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-paper hover:bg-saffron hover:text-navy hover:border-saffron"
                      >
                        <Send size={12} className="mr-1" /> Send request
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Current mentees */}
        <section id="current" className="border border-black/15 bg-paper p-8">
          <SectionHeader eyebrow="Current mentees" title="Journeys you&apos;re actively running" />
          {currentMentees.length === 0 ? (
            <p className="text-sm text-navy/60" data-testid="mentor-current-empty">
              No active journeys yet. Accept a request to start one.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2" data-testid="mentor-current-list">
              {currentMentees.map((r) => {
                const me = findMentee(r.menteeId);
                if (!me) return null;
                return (
                  <div key={r.id} data-testid={`mentor-current-${r.id}`} className="border border-navy bg-navy p-5 text-paper">
                    <div className="flex gap-4">
                      <img src={me.photo} alt={me.name} className="h-14 w-14 object-cover object-top" />
                      <div className="flex-1">
                        <div className="font-serif text-lg font-semibold text-paper">{me.name}</div>
                        <div className="text-xs text-paper/70">{me.currentRole}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-paper/80">{r.note}</p>
                    {r.customPrice != null && (
                      <div className="mt-3 text-xs text-saffron">Agreed rate · ₹{r.customPrice}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Incoming requests */}
        <section id="incoming" className="border border-black/15 bg-paper p-8">
          <SectionHeader eyebrow="Requests received" title="Mentees asking to work with you" />
          {incoming.length === 0 ? (
            <p className="text-sm text-navy/60" data-testid="mentor-incoming-empty">
              Nothing pending — you're all caught up.
            </p>
          ) : (
            <div className="space-y-4" data-testid="mentor-incoming-list">
              {incoming.map((r) => {
                const me = findMentee(r.menteeId);
                if (!me) return null;
                return (
                  <div
                    key={r.id}
                    data-testid={`mentor-incoming-${r.id}`}
                    className="flex flex-col gap-4 border border-black/15 bg-paper p-5 sm:flex-row sm:items-center"
                  >
                    <img src={me.photo} alt={me.name} className="h-14 w-14 object-cover object-top" />
                    <div className="flex-1">
                      <div className="font-serif text-lg font-semibold text-navy">{me.name}</div>
                      <div className="text-xs text-navy/60">{me.city} · {me.currentRole}</div>
                      <p className="mt-2 text-sm text-navy/75">{r.note}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        data-testid={`mentor-accept-${r.id}`}
                        onClick={() => {
                          updateRequestStatus(r.id, 'accepted');
                          toast.success(`Accepted — ${me.name} is now a current mentee.`);
                        }}
                        className="rounded-none border-2 border-navy bg-saffron px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                      >
                        <Check size={13} className="mr-1" /> Accept
                      </Button>
                      <Button
                        data-testid={`mentor-decline-${r.id}`}
                        variant="ghost"
                        onClick={() => {
                          updateRequestStatus(r.id, 'declined');
                          toast.info('Request declined.');
                        }}
                        className="rounded-none border-2 border-black/20 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy"
                      >
                        <Trash2 size={13} className="mr-1" /> Decline
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Sent requests */}
        <section id="sent" className="border border-black/15 bg-paper p-8">
          <SectionHeader eyebrow="Requests sent" title="Mentees you've reached out to" />
          {sent.length === 0 ? (
            <p className="text-sm text-navy/60" data-testid="mentor-sent-empty">
              Reach out to potential mentees above — offer a discounted intro if you like.
            </p>
          ) : (
            <div className="space-y-3" data-testid="mentor-sent-list">
              {sent.map((r) => {
                const me = findMentee(r.menteeId);
                if (!me) return null;
                const badge = {
                  pending: 'bg-sand text-navy',
                  accepted: 'bg-saffron text-navy',
                  declined: 'bg-navy/10 text-navy/60 line-through',
                }[r.status];
                return (
                  <div
                    key={r.id}
                    data-testid={`mentor-sent-${r.id}`}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-black/15 bg-paper px-5 py-3"
                  >
                    <img src={me.photo} alt={me.name} className="h-10 w-10 object-cover object-top" />
                    <div>
                      <div className="text-sm font-medium text-navy">{me.name}</div>
                      <div className="text-xs text-navy/60">Offered ₹{r.customPrice} · {r.note?.slice(0, 60) || 'No note'}</div>
                    </div>
                    <span className={`border border-black/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${badge}`}>
                      {r.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <SendRequestDialog
        open={!!dialogMentee}
        onOpenChange={(v) => !v && setDialogMentee(null)}
        mentee={dialogMentee}
        mentor={mentor}
        mentorId={mentorId}
        onSent={bump}
      />
    </DashboardShell>
  );
}
