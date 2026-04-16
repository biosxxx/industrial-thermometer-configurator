import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaInput = ({ className, ...props }: TextareaInputProps) => (
  <textarea
    {...props}
    className={cn(
      'w-full rounded-3xl border border-white/5 bg-panelSoft px-4 py-3 font-mono text-xs leading-relaxed text-slate-100 placeholder:text-slate-500',
      'transition duration-150 focus:border-orange-400 focus:outline-none',
      className,
    )}
  />
);

