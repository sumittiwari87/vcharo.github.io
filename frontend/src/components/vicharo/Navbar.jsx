import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" data-testid="navbar-logo" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-navy">VICHARO</span>
          <span className="font-devanagari text-lg text-saffron leading-none">विचार</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={l.href}
                className="text-sm text-navy/80 transition-colors duration-200 hover:text-saffron"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            data-testid="navbar-login-link"
            href="#login"
            className="text-sm font-medium text-navy hover:text-saffron transition-colors duration-200"
          >
            Login
          </a>
          <Button
            data-testid="navbar-get-started-btn"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-tactile-inverse rounded-none border border-navy bg-navy px-5 py-5 font-sans text-sm text-paper hover:bg-navy"
          >
            Get Started
          </Button>
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
                <a
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a data-testid="nav-mobile-login" href="#login" className="text-base font-medium text-navy">
                Login
              </a>
            </li>
            <li>
              <Button
                data-testid="nav-mobile-get-started-btn"
                onClick={() => {
                  setOpen(false);
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-none w-full border border-navy bg-navy py-6 text-paper hover:bg-navy"
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
