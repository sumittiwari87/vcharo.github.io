import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CTABand = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('mentee');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/waitlist`, { email, role, source: 'landing-cta' });
      if (res.data.already_registered) {
        toast.info(res.data.message);
      } else {
        toast.success(res.data.message || "You're on the list.");
      }
      setEmail('');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Try again.';
      toast.error(typeof msg === 'string' ? msg : 'Could not join waitlist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative overflow-hidden border-b border-black/10 bg-paper py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 saffron-glow" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="text-xs uppercase tracking-[0.25em] text-saffron">
          Start your journey
        </div>
        <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Start your mentorship
          <br /> journey <span className="italic">today</span>.
          <span className="ml-2 font-devanagari text-saffron">आज</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy/70">
          Join the VICHARO waitlist. Get early access, an intro session with a hand-picked mentor,
          and ₹500 off your first journey.
        </p>

        <form
          onSubmit={submit}
          data-testid="waitlist-form"
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="mb-4 flex justify-center gap-2">
            <button
              type="button"
              data-testid="role-toggle-mentee"
              data-role="mentee"
              onClick={() => setRole('mentee')}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${role === 'mentee' ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy hover:border-navy'}`}
            >
              I&apos;m a mentee
            </button>
            <button
              type="button"
              data-testid="role-toggle-mentor"
              data-role="mentor"
              onClick={() => setRole('mentor')}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${role === 'mentor' ? 'border-navy bg-navy text-paper' : 'border-black/15 bg-paper text-navy hover:border-navy'}`}
            >
              I&apos;m a mentor
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              data-testid="waitlist-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-14 flex-1 rounded-none border-2 border-navy bg-paper px-5 text-base text-navy placeholder:text-navy/40 focus-visible:ring-0"
            />
            <Button
              data-testid="waitlist-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-tactile group h-14 rounded-none border-2 border-navy bg-saffron px-7 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-saffron"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  Join waitlist
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
          <p className="mt-4 text-xs text-navy/50">
            No spam, one email a month, unsubscribe any time.
          </p>
        </form>
      </div>
    </section>
  );
};

export default CTABand;
