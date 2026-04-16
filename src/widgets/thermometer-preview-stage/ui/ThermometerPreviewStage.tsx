import type { RefObject } from 'react';
import { Thermometer } from 'lucide-react';
import { selectPreviewBadges, selectVisualLayout } from '@/entities/thermometer-config/model/selectors';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { ThermometerPreviewSvg } from '@/entities/thermometer-preview/ui/ThermometerPreviewSvg';
import { en } from '@/shared/i18n';
import { StatusPill } from '@/shared/ui/StatusPill';

type ThermometerPreviewStageProps = {
  previewRef: RefObject<HTMLDivElement>;
};

export const ThermometerPreviewStage = ({ previewRef }: ThermometerPreviewStageProps) => {
  const config = useThermometerConfiguratorStore((state) => state.config);
  const visual = selectVisualLayout(config);
  const badges = selectPreviewBadges(config);

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-3">
          <Thermometer className="text-orange-400" size={20} />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">{en.sections.livePreview}</p>
          <p className="text-sm text-slate-300">Live SVG rendering of stem, dial, and thermowell geometry</p>
        </div>
      </div>

      <div
        ref={previewRef}
        data-preview-capture
        data-testid="preview-stage"
        className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[var(--preview-stage)] p-6 shadow-preview md:p-10"
      >
        <div
          data-preview-title
          className="absolute left-8 top-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400"
        >
          {en.preview.title}
        </div>

        <div data-preview-figure className="mx-auto aspect-square max-w-[760px] pt-10">
          <ThermometerPreviewSvg config={config} visual={visual} />
        </div>

        <div data-preview-badges className="absolute bottom-8 left-8 flex max-w-[70%] flex-wrap gap-2">
          {badges.map((badge) => (
            <StatusPill key={badge.label} tone={badge.tone}>
              {badge.label}
            </StatusPill>
          ))}
        </div>

        <div
          data-preview-watermark
          className="absolute bottom-8 right-8 text-[10px] font-black uppercase tracking-[0.18em] text-orange-400/60"
        >
          {en.preview.watermark}
        </div>

        {config.connection.location === 'Back' ? (
          <div
            data-preview-footer
            className="absolute bottom-8 right-8 translate-y-5 text-sm font-mono text-slate-400"
          >
            {en.preview.footerBack}
          </div>
        ) : null}
      </div>
    </div>
  );
};
