import { Maximize2, ScrollText } from 'lucide-react';
import { useState } from 'react';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { TechnicalContentPreview } from '@/entities/technical-content/ui/TechnicalContentPreview';
import { TechnicalParamsEditorModal } from '@/features/technical-params-form/ui/TechnicalParamsEditorModal';
import { en } from '@/shared/i18n';
import { Field } from '@/shared/ui/Field';
import { SectionCard } from '@/shared/ui/SectionCard';
import { TextareaInput } from '@/shared/ui/TextareaInput';

export const TechnicalParamsForm = () => {
  const technicalParameters = useThermometerConfiguratorStore((state) => state.config.otherTechnicalParams);
  const technicalContent = useThermometerConfiguratorStore((state) => state.config.technicalContent);
  const setField = useThermometerConfiguratorStore((state) => state.setField);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionCard
        title={en.sections.technicalParameters}
        icon={ScrollText}
        accentClass="text-pink-400"
        headerAction={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label={en.technicalEditor.open}
            className="rounded-2xl border border-pink-400/20 bg-pink-500/10 p-3 text-pink-200 transition hover:bg-pink-500/20"
          >
            <Maximize2 size={16} />
          </button>
        }
      >
        <div className="space-y-5">
          <Field label={en.labels.technicalParameters} htmlFor="technical-parameters">
            <TextareaInput
              id="technical-parameters"
              rows={8}
              value={technicalParameters}
              onChange={(event) => setField('otherTechnicalParams', event.currentTarget.value)}
              placeholder={en.placeholders.technicalParameters}
            />
          </Field>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {en.labels.technicalBlocks}
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-xs font-bold uppercase tracking-[0.16em] text-pink-300 transition hover:text-white"
              >
                {en.technicalEditor.open}
              </button>
            </div>

            <div className="app-scrollbar max-h-[360px] overflow-y-auto pr-1">
              <TechnicalContentPreview
                technicalParameters={technicalParameters}
                blocks={technicalContent}
                variant="panel"
                emptyStateText={en.technicalEditor.empty}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <TechnicalParamsEditorModal
        open={modalOpen}
        technicalParameters={technicalParameters}
        blocks={technicalContent}
        onTechnicalParametersChange={(value) => setField('otherTechnicalParams', value)}
        onBlocksChange={(blocks) => setField('technicalContent', blocks)}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

