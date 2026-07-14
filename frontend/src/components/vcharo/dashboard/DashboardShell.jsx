import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useSession } from '../../../lib/session';
import { toast } from 'sonner';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Toaster } from '../../ui/sonner';

const SidebarLink = ({ to, label, testId, count }) => (
  <NavLink
    to={to}
    end
    data-testid={testId}
    className={({ isActive }) =>
      `flex items-center justify-between border-l-2 px-4 py-3 text-sm transition-colors ${
        isActive
          ? 'border-saffron bg-navy text-paper'
          : 'border-transparent text-navy hover:border-black/20 hover:bg-sand/50'
      }`
    }
  >
    <span>{label}</span>
    {count != null && (
      <span className="rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold">
        {count}
      </span>
    )}
  </NavLink>
);

export default function DashboardShell({ title, subtitle, sidebar, children, testId }) {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogout = () => {
    logout();
    toast.success('Signed out.');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen paper-noise" data-testid={testId}>
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10 lg:pt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-saffron">Dashboard</div>
            <h1 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-sm text-navy/70 sm:text-base">{subtitle}</p>}
          </div>
          {user && (
            <div className="hidden items-center gap-4 md:flex" data-testid="dashboard-user-chip">
              <div className="text-right">
                <div className="text-sm font-medium text-navy">{user.name || 'Guest'}</div>
                <div className="text-xs uppercase tracking-widest text-saffron">
                  {user.role}
                </div>
              </div>
              <button
                data-testid="dashboard-logout-btn"
                onClick={handleLogout}
                aria-label="Sign out"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-navy bg-paper text-navy transition-colors hover:bg-navy hover:text-paper"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-14">
        <aside className="lg:col-span-3">
          <nav className="border border-black/15 bg-paper" data-testid="dashboard-sidebar">
            {sidebar.map((s) => (
              <SidebarLink key={s.to} {...s} />
            ))}
          </nav>
          {user && (
            <button
              onClick={handleLogout}
              data-testid="dashboard-mobile-logout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 border-2 border-navy bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper md:hidden"
            >
              <LogOut size={14} /> Sign out
            </button>
          )}
        </aside>
        <main className="lg:col-span-9">{children}</main>
      </div>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
