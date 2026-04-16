import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ className, ...props }: TextInputProps) => (
  <input
    {...props}
    className={cn(
      'w-full rounded-2xl border border-white/5 bg-panelSoft px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500',
      'transition duration-150 focus:border-orange-400 focus:outline-none',
      className,
    )}
  />
);

