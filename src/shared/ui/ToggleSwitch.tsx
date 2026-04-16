import { cn } from '@/shared/lib/cn';

type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export const ToggleSwitch = ({ checked, onChange, label }: ToggleSwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={cn(
      'relative h-6 w-11 rounded-full transition-colors',
      checked ? 'bg-cyan-500' : 'bg-slate-700',
    )}
  >
    <span
      className={cn(
        'absolute top-1 h-4 w-4 rounded-full bg-white transition-all',
        checked ? 'left-6' : 'left-1',
      )}
    />
  </button>
);

