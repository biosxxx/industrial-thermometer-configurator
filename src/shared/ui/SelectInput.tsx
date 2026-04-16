import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput = ({ className, children, ...props }: SelectInputProps) => (
  <select
    {...props}
    className={cn(
      'w-full rounded-2xl border border-white/5 bg-panelSoft px-4 py-3 text-sm font-semibold text-slate-100',
      'transition duration-150 focus:border-orange-400 focus:outline-none',
      className,
    )}
  >
    {children}
  </select>
);

