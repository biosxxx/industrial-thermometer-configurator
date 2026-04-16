import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/cn';

type StatusPillProps = PropsWithChildren<{
  tone?: 'neutral' | 'accent' | 'info' | 'warning';
  className?: string;
}>;

const toneClasses: Record<NonNullable<StatusPillProps['tone']>, string> = {
  neutral: 'border-white/10 bg-white/5 text-slate-300',
  accent: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
  info: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100',
  warning: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
};

export const StatusPill = ({ tone = 'neutral', className, children }: StatusPillProps) => (
  <span
    data-tone={tone}
    className={cn(
      'inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
      toneClasses[tone],
      className,
    )}
  >
    {children}
  </span>
);
