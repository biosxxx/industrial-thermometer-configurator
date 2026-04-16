import { Check, Settings } from 'lucide-react';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { en } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { SectionCard } from '@/shared/ui/SectionCard';

type OptionButtonProps = {
  label: string;
  enabled: boolean;
  onClick: () => void;
};

const OptionButton = ({ label, enabled, onClick }: OptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={enabled}
    className={cn(
      'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition-all',
      enabled
        ? 'border-violet-400 bg-violet-500/15 text-violet-100'
        : 'border-white/5 bg-panelSoft text-slate-400 hover:bg-slate-800',
    )}
  >
    <span>{label}</span>
    <span
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full border',
        enabled ? 'border-violet-300 bg-violet-400/20' : 'border-slate-600',
      )}
    >
      {enabled ? <Check size={14} /> : null}
    </span>
  </button>
);

export const OptionsForm = () => {
  const options = useThermometerConfiguratorStore((state) => state.config.options);
  const toggleOption = useThermometerConfiguratorStore((state) => state.toggleOption);

  return (
    <SectionCard title={en.sections.options} icon={Settings} accentClass="text-violet-400">
      <div className="space-y-2">
        <OptionButton
          label={en.options.redPointer}
          enabled={options.redPointer}
          onClick={() => toggleOption('redPointer')}
        />
        <OptionButton
          label={en.options.dragPointer}
          enabled={options.dragPointer}
          onClick={() => toggleOption('dragPointer')}
        />
        <OptionButton
          label={en.options.calibrationCert}
          enabled={options.calibrationCert}
          onClick={() => toggleOption('calibrationCert')}
        />
      </div>
    </SectionCard>
  );
};
