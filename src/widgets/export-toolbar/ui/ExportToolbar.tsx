import { RotateCcw, Thermometer } from 'lucide-react';
import type { RefObject } from 'react';
import { selectModelName } from '@/entities/thermometer-config/model/selectors';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { ExportPdfButton } from '@/features/export-pdf/ui/ExportPdfButton';
import { en } from '@/shared/i18n';
import { StatusPill } from '@/shared/ui/StatusPill';

type ExportToolbarProps = {
  previewRef: RefObject<HTMLDivElement>;
};

export const ExportToolbar = ({ previewRef }: ExportToolbarProps) => {
  const config = useThermometerConfiguratorStore((state) => state.config);
  const resetToDefaults = useThermometerConfiguratorStore((state) => state.resetToDefaults);
  const modelName = selectModelName(config);

  return (
    <header className="mb-8 border-b border-white/5 pb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-3xl border border-orange-400/20 bg-orange-500/10 p-4 shadow-[0_0_24px_rgba(249,115,22,0.12)]">
            <Thermometer className="text-orange-400" size={28} />
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tight text-white md:text-4xl">
                {en.header.title}
              </h1>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
                <span className="text-orange-400">{en.header.product}</span>
                <span className="mx-2 text-slate-600">/</span>
                <span>Series {modelName}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusPill tone="accent">{modelName}</StatusPill>
              <StatusPill>{`${config.rangeMin}..${config.rangeMax} ${config.unit}`}</StatusPill>
              <StatusPill tone="info">{`Stem ${config.stem.length} x ${config.stem.diameter} mm`}</StatusPill>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <button
            type="button"
            onClick={resetToDefaults}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
          >
            <RotateCcw size={16} />
            <span>{en.header.resetDefaults}</span>
          </button>
          <ExportPdfButton previewRef={previewRef} />
        </div>
      </div>
    </header>
  );
};
