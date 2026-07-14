import { BadgeCheck, Linkedin, Building2 } from 'lucide-react';

// VerifiedBadges — canonical rendering of the 3 badge types.
// badges: string[] — subset of ['identity', 'linkedin', 'company'].
// size: 'sm' (dot only) | 'md' (chip with text) | 'lg' (chip with tooltip line).

const CATALOG = {
  identity: {
    icon: BadgeCheck,
    label: 'Identity Verified',
    tooltip: 'Signed in with Google or LinkedIn OAuth. Real person, name confirmed.',
    ring: 'border-navy bg-navy text-paper',
    dot: 'bg-navy',
  },
  linkedin: {
    icon: Linkedin,
    label: 'LinkedIn Verified',
    tooltip: 'Current employer on LinkedIn matches the mentor\u2019s claimed company.',
    ring: 'border-[#0A66C2] bg-[#0A66C2] text-paper',
    dot: 'bg-[#0A66C2]',
  },
  company: {
    icon: Building2,
    label: 'Company Verified',
    tooltip: 'Confirmed via work email or HR letter. Actively employed at claimed company.',
    ring: 'border-saffron bg-saffron text-navy',
    dot: 'bg-saffron',
  },
};

export default function VerifiedBadges({ badges = [], size = 'md', testId = 'verified-badges' }) {
  if (!badges || badges.length === 0) return null;

  if (size === 'sm') {
    return (
      <div data-testid={testId} className="flex items-center gap-1">
        {badges.map((b) => {
          const c = CATALOG[b];
          if (!c) return null;
          return (
            <span
              key={b}
              data-testid={`badge-dot-${b}`}
              title={c.label}
              aria-label={c.label}
              className={`h-2.5 w-2.5 rounded-full ${c.dot}`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div data-testid={testId} className="flex flex-wrap items-center gap-2">
      {badges.map((b) => {
        const c = CATALOG[b];
        if (!c) return null;
        const Icon = c.icon;
        return (
          <span
            key={b}
            data-testid={`badge-${b}`}
            title={c.tooltip}
            className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${c.ring}`}
          >
            <Icon size={12} />
            {c.label}
          </span>
        );
      })}
    </div>
  );
}

export const badgeCatalog = CATALOG;
