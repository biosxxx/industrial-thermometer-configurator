import { ImagePlus, Maximize2, Rows3, Type, X } from 'lucide-react';
import { useEffect } from 'react';
import { createTechnicalContentBlock } from '@/entities/thermometer-config/lib/technical-content';
import type { TechnicalContentBlock } from '@/entities/thermometer-config/model/types';
import { TechnicalContentPreview } from '@/entities/technical-content/ui/TechnicalContentPreview';
import { en } from '@/shared/i18n';
import { TextareaInput } from '@/shared/ui/TextareaInput';
import { TechnicalContentBlockEditor } from '@/features/technical-params-form/ui/TechnicalContentBlockEditor';
import { removeTechnicalBlock } from '@/features/technical-params-form/lib/technical-content-editor';

type TechnicalParamsEditorModalProps = {
  open: boolean;
  technicalParameters: string;
  blocks: TechnicalContentBlock[];
  onTechnicalParametersChange: (value: string) => void;
  onBlocksChange: (blocks: TechnicalContentBlock[]) => void;
  onClose: () => void;
};

const addBlockButtons = [
  {
    type: 'text' as const,
    label: en.technicalEditor.addText,
    icon: Type,
  },
  {
    type: 'table' as const,
    label: en.technicalEditor.addTable,
    icon: Rows3,
  },
  {
    type: 'image' as const,
    label: en.technicalEditor.addImage,
    icon: ImagePlus,
  },
];

export const TechnicalParamsEditorModal = ({
  open,
  technicalParameters,
  blocks,
  onTechnicalParametersChange,
  onBlocksChange,
  onClose,
}: TechnicalParamsEditorModalProps) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={en.technicalEditor.title}
        className="flex h-[min(92vh,980px)] w-full max-w-[1480px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#11151b] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-pink-400/20 bg-pink-500/10 p-3 text-pink-300">
              <Maximize2 size={18} />
            </div>
            <div>
              <div className="text-lg font-black uppercase tracking-[0.18em] text-white">
                {en.technicalEditor.title}
              </div>
              <div className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
                {en.technicalEditor.subtitle}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={en.technicalEditor.close}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 xl:grid-cols-[minmax(420px,560px)_minmax(0,1fr)]">
          <section className="app-scrollbar min-h-0 overflow-y-auto border-b border-white/10 px-6 py-6 xl:border-b-0 xl:border-r">
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Base technical note
                </div>
                <TextareaInput
                  rows={10}
                  value={technicalParameters}
                  onChange={(event) => onTechnicalParametersChange(event.currentTarget.value)}
                  placeholder={en.placeholders.technicalParameters}
                />
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {en.technicalEditor.editorTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {addBlockButtons.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onBlocksChange([...blocks, createTechnicalContentBlock(type)])}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-100 transition hover:bg-white/10"
                    >
                      <Icon size={14} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {blocks.length ? (
                  blocks.map((block) => (
                    <TechnicalContentBlockEditor
                      key={block.id}
                      block={block}
                      allBlocks={blocks}
                      onBlocksChange={onBlocksChange}
                      onRemove={() => onBlocksChange(removeTechnicalBlock(blocks, block.id))}
                    />
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 p-4 text-sm leading-6 text-slate-400">
                    {en.technicalEditor.empty}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="app-scrollbar min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#e5ecf5_100%)] px-6 py-6">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {en.technicalEditor.previewTitle}
            </div>

            <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-8">
              <div className="mb-5 border-b border-slate-200 pb-4">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-pink-500">
                  {en.sections.technicalParameters}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Live document fragment preview for the configurator page.
                </div>
              </div>

              <TechnicalContentPreview
                technicalParameters={technicalParameters}
                blocks={blocks}
                variant="document"
                emptyStateText={en.technicalEditor.empty}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

