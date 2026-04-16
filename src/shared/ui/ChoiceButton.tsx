import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/cn';

type ChoiceButtonProps = PropsWithChildren<{
  selected: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}>;

export const ChoiceButton = ({
  selected,
  onClick,
  className,
  ariaLabel,
  children,
}: ChoiceButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    aria-label={ariaLabel}
    className={cn(
      'rounded-2xl border px-4 py-3 text-sm font-bold transition-all',
      selected
        ? 'border-orange-400 bg-orange-500/15 text-orange-300 shadow-[0_0_16px_rgba(249,115,22,0.16)]'
        : 'border-white/5 bg-panelSoft text-slate-400 hover:bg-slate-800',
      className,
    )}
  >
    {children}
  </button>
);

