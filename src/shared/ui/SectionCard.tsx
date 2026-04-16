import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type SectionCardProps = PropsWithChildren<{
  title: string;
  icon: LucideIcon;
  accentClass: string;
  className?: string;
  headerAction?: ReactNode;
}>;

export const SectionCard = ({
  title,
  icon: Icon,
  accentClass,
  className,
  headerAction,
  children,
}: SectionCardProps) => (
  <section
    className={cn(
      'rounded-4xl border border-white/5 bg-panel/95 p-6 shadow-panel backdrop-blur',
      className,
    )}
  >
    <div className="mb-4 flex items-start justify-between gap-3">
      <h2 className={cn('flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em]', accentClass)}>
        <Icon size={16} />
        <span>{title}</span>
      </h2>
      {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
    </div>
    {children}
  </section>
);
