import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/button';
import { useSession } from '../../lib/session';
import LoginDialog from './auth/LoginDialog';

const links = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Mentors', href: '/mentors' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthed, logout } = useSession();

  const goDashboard = () => navigate(user?.role === 'mentor' ? '/dashboard/mentor' : '/dashboard/mentee');

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" data-testid="navbar-logo" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-navy">Vcharo</span>
          <span className="font-devanagari text-lg text-saffron leading-none">विचार</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={l.href}
                className="text-sm text-navy/80 transition-colors duration-200 hover:text-saffron"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthed ? (
            <>
              <button
                data-testid="navbar-dashboard-btn"
                onClick={goDashboard}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-saffron transition-colors"
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <div className="flex items-center gap-2 border border-black/15 bg-paper px-3 py-1.5" data-testid="navbar-user-chip">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-semibold uppercase text-paper">
                  {(user.name || user.email || '?').slice(0, 1)}
                </div>
                <span className="text-xs uppercase tracking-widest text-saffron">{user.role}</span>
              </div>
              <Button
                data-testid="navbar-logout-btn"
                onClick={() => { logout(); navigate('/'); }}
                variant="ghost"
                className="rounded-none border border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <button
                data-testid="navbar-login-link"
                onClick={() => setLoginOpen(true)}
                className="text-sm font-medium text-navy hover:text-saffron transition-colors duration-200"
              >
                Login
              </button>
              <Button
                data-testid="navbar-get-started-btn"
                onClick={() => navigate('/get-started')}
                className="btn-tactile-inverse rounded-none border border-navy bg-navy px-5 py-5 font-sans text-sm text-paper hover:bg-navy"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-navy"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/10 bg-paper px-6 py-6">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-navy"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {isAuthed ? (
              <>
                <li>
                  <button
                    data-testid="nav-mobile-dashboard"
                    onClick={() => { setOpen(false); goDashboard(); }}
                    className="text-base font-medium text-navy"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    data-testid="nav-mobile-logout"
                    onClick={() => { setOpen(false); logout(); navigate('/'); }}
                    className="text-base font-medium text-red-500"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    data-testid="nav-mobile-login"
                    onClick={() => { setOpen(false); setLoginOpen(true); }}
                    className="text-base font-medium text-navy"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <Button
                    data-testid="nav-mobile-get-started-btn"
                    onClick={() => {
                      setOpen(false);
                      navigate('/get-started');
                    }}
                    className="rounded-none w-full border border-navy bg-navy py-6 text-paper hover:bg-navy"
                  >
                    Get Started
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
};

export default Navbar;
