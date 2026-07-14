import { Check } from 'lucide-react';

// StepIndicator — horizontal progress bar with numbered nodes.
// Props: steps: string[] (labels), current: number (0-indexed).
export default function StepIndicator({ steps, current, testId = 'onboarding-step-indicator' }) {
  return (
    <ol
      data-testid={testId}
      className="mx-auto flex w-full max-w-2xl items-center justify-between"
    >
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending';
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                data-testid={`step-node-${i}`}
                className={`grid h-9 w-9 place-items-center border-2 text-xs font-semibold transition-colors ${
                  state === 'done'
                    ? 'border-navy bg-navy text-paper'
                    : state === 'active'
                    ? 'border-navy bg-saffron text-navy'
                    : 'border-black/25 bg-paper text-navy/50'
                }`}
              >
                {state === 'done' ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`hidden text-[10px] font-semibold uppercase tracking-widest sm:block ${
                  state === 'pending' ? 'text-navy/40' : 'text-navy'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-3 hidden h-[2px] flex-1 sm:block ${
                  i < current ? 'bg-navy' : 'bg-black/15'
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
