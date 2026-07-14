import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GraduationCap, Users2, Mail, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useSession } from '../../../lib/session';

const RoleTile = ({ testId, icon: Icon, label, hindi, sub, active, onClick }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className={`group flex-1 border-2 p-6 text-left transition-colors ${
      active
        ? 'border-navy bg-navy text-paper'
        : 'border-black/15 bg-paper text-navy hover:border-navy'
    }`}
  >
    <div className={`grid h-11 w-11 place-items-center border ${active ? 'border-saffron bg-saffron/20' : 'border-black/15'}`}>
      <Icon size={20} className={active ? 'text-saffron' : 'text-saffron'} />
    </div>
    <div className="mt-5 font-serif text-lg font-semibold">{label}</div>
    <div className={`mt-0.5 font-devanagari text-sm ${active ? 'text-saffron' : 'text-saffron/90'}`}>{hindi}</div>
    <div className={`mt-3 text-xs leading-relaxed ${active ? 'text-paper/70' : 'text-navy/60'}`}>{sub}</div>
  </button>
);

const SocialButton = ({ testId, label, brand, onClick, disabled }) => (
  <Button
    data-testid={testId}
    onClick={onClick}
    disabled={disabled}
    variant="ghost"
    className="h-12 w-full rounded-none border-2 border-navy bg-paper font-sans text-sm font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
  >
    <span className="mr-2 font-bold" aria-hidden>{brand}</span>
    Continue with {label}
  </Button>
);

export default function LoginDialog({ open, onOpenChange, defaultRole = null }) {
  const navigate = useNavigate();
  const { login } = useSession();
  const [role, setRole] = useState(defaultRole);
  const [tab, setTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const finish = (channel) => {
    setBusy(true);
    // simulate a network call to keep the UX honest
    setTimeout(() => {
      const derivedName = (email || `${channel}-user`).split('@')[0].replace(/[._-]/g, ' ');
      login({
        role,
        email: email || `${channel}@example.com`,
        name: derivedName || channel,
        channel,
      });
      toast.success(`Signed in as ${role} · via ${channel}. (Demo — no real auth yet.)`);
      onOpenChange(false);
      setBusy(false);
      navigate(role === 'mentor' ? '/dashboard/mentor' : '/dashboard/mentee');
    }, 500);
  };

  const submitEmail = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Enter email and password to continue.');
      return;
    }
    finish('email');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="login-dialog"
        className="max-w-lg rounded-none border-2 border-navy bg-paper p-8"
      >
        <DialogHeader className="text-left">
          <div className="text-[10px] uppercase tracking-[0.25em] text-saffron">Sign in</div>
          <DialogTitle className="mt-3 font-serif text-3xl font-bold text-navy">
            Welcome back to <span className="italic">Vcharo</span>.
          </DialogTitle>
          <DialogDescription className="text-sm text-navy/70">
            Pick who you are — the rest of Vcharo adapts to it.
          </DialogDescription>
        </DialogHeader>

        {!role ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-testid="login-role-picker">
            <RoleTile
              testId="login-role-mentee"
              icon={GraduationCap}
              label="I'm a Mentee"
              hindi="मैं सीखने आया हूँ"
              sub="Ambitious student or early-career professional looking for a senior guide."
              onClick={() => setRole('mentee')}
            />
            <RoleTile
              testId="login-role-mentor"
              icon={Users2}
              label="I'm a Mentor"
              hindi="मैं मार्गदर्शक हूँ"
              sub="Senior IC or leader ready to monetize expertise and build a portfolio."
              onClick={() => setRole('mentor')}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between border border-black/15 bg-sand/50 px-4 py-3">
              <div className="text-sm text-navy">
                Signing in as{' '}
                <span className="font-semibold uppercase tracking-widest text-saffron">
                  {role === 'mentor' ? 'Mentor' : 'Mentee'}
                </span>
              </div>
              <button
                data-testid="login-role-change"
                onClick={() => setRole(null)}
                className="text-xs font-semibold uppercase tracking-widest text-navy/70 underline underline-offset-4 hover:text-saffron"
              >
                Change
              </button>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="inline-flex h-auto gap-0 rounded-none border border-black/15 bg-paper p-0">
                <TabsTrigger
                  value="email"
                  data-testid="login-tab-email"
                  className="rounded-none border-r border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  <Mail size={13} className="mr-1.5" /> Email
                </TabsTrigger>
                <TabsTrigger
                  value="google"
                  data-testid="login-tab-google"
                  className="rounded-none border-r border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  Google
                </TabsTrigger>
                <TabsTrigger
                  value="linkedin"
                  data-testid="login-tab-linkedin"
                  className="rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-widest data-[state=active]:bg-navy data-[state=active]:text-paper"
                >
                  LinkedIn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-6">
                <form onSubmit={submitEmail} className="space-y-3" data-testid="login-email-form">
                  <Input
                    data-testid="login-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 rounded-none border-2 border-navy bg-paper text-navy placeholder:text-navy/40 focus-visible:ring-0"
                  />
                  <Input
                    data-testid="login-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (any 6+ characters for demo)"
                    className="h-12 rounded-none border-2 border-navy bg-paper text-navy placeholder:text-navy/40 focus-visible:ring-0"
                  />
                  <Button
                    data-testid="login-email-submit"
                    type="submit"
                    disabled={busy}
                    className="btn-tactile h-12 w-full rounded-none border-2 border-navy bg-saffron text-sm font-semibold uppercase tracking-widest text-navy hover:bg-saffron"
                  >
                    {busy ? <Loader2 size={16} className="animate-spin" /> : 'Sign in'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="google" className="mt-6 space-y-3">
                <SocialButton
                  testId="login-google-btn"
                  label="Google"
                  brand="G"
                  disabled={busy}
                  onClick={() => finish('google')}
                />
                <p className="text-xs text-navy/50">
                  Demo — real Google Auth (Emergent-managed) is on the roadmap.
                </p>
              </TabsContent>

              <TabsContent value="linkedin" className="mt-6 space-y-3">
                <SocialButton
                  testId="login-linkedin-btn"
                  label="LinkedIn"
                  brand="in"
                  disabled={busy}
                  onClick={() => finish('linkedin')}
                />
                <p className="text-xs text-navy/50">
                  Demo — LinkedIn OAuth is planned for the mentor-verification flow.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
