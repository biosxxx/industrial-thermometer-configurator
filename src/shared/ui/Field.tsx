import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type FieldProps = PropsWithChildren<{
  label: string;
  htmlFor?: string;
  action?: ReactNode;
  className?: string;
}>;

export const Field = ({ label, htmlFor, action, className, children }: FieldProps) => (
  <div className={cn('space-y-2', className)}>
    <div className="flex items-end justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className="ml-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400"
      >
        {label}
      </label>
      {action}
    </div>
    {children}
  </div>
);

