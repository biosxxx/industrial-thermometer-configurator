import { ImagePlus, Plus, Trash2 } from 'lucide-react';
import type { ChangeEvent } from 'react';
import type { TechnicalContentBlock } from '@/entities/thermometer-config/model/types';
import { en } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Field } from '@/shared/ui/Field';
import { TextInput } from '@/shared/ui/TextInput';
import { TextareaInput } from '@/shared/ui/TextareaInput';
import {
  addTableColumn,
  addTableRow,
  removeTableColumn,
  removeTableRow,
  updateTableCell,
  updateTableColumnHeader,
  updateTechnicalBlock,
} from '@/features/technical-params-form/lib/technical-content-editor';

type TechnicalContentBlockEditorProps = {
  block: TechnicalContentBlock;
  allBlocks: TechnicalContentBlock[];
  onBlocksChange: (blocks: TechnicalContentBlock[]) => void;
  onRemove: () => void;
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Unable to read the selected file.'));
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
  });

export const TechnicalContentBlockEditor = ({
  block,
  allBlocks,
  onBlocksChange,
  onRemove,
}: TechnicalContentBlockEditorProps) => {
  const updateBlock = (nextBlock: TechnicalContentBlock) =>
    onBlocksChange(updateTechnicalBlock(allBlocks, block.id, nextBlock));

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file || block.type !== 'image') {
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    updateBlock({
      ...block,
      src: dataUrl,
      title: block.title || file.name.replace(/\.[^.]+$/, ''),
    });
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/30 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {block.type}
          </div>
          <div className="mt-1 text-sm font-bold text-slate-100">
            {block.title || 'Untitled block'}
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-2 text-rose-200 transition hover:bg-rose-500/20"
          aria-label={en.technicalEditor.removeBlock}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <Field label={en.technicalEditor.titleLabel}>
          <TextInput
            value={block.title}
            onChange={(event) => updateBlock({ ...block, title: event.currentTarget.value })}
            placeholder={en.placeholders.blockTitle}
          />
        </Field>

        {block.type === 'text' ? (
          <Field label={en.technicalEditor.textLabel}>
            <TextareaInput
              rows={5}
              value={block.text}
              onChange={(event) => updateBlock({ ...block, text: event.currentTarget.value })}
              placeholder={en.placeholders.technicalParameters}
            />
          </Field>
        ) : null}

        {block.type === 'table' ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onBlocksChange(addTableRow(allBlocks, block.id))}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                <Plus size={14} />
                <span>{en.technicalEditor.tableAddRow}</span>
              </button>
              <button
                type="button"
                onClick={() => onBlocksChange(addTableColumn(allBlocks, block.id))}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                <Plus size={14} />
                <span>{en.technicalEditor.tableAddColumn}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    {block.columns.map((column, columnIndex) => (
                      <th key={`column-${block.id}-${columnIndex}`} className="border border-white/10 bg-white/5 p-2">
                        <div className="flex items-center gap-2">
                          <TextInput
                            value={column}
                            onChange={(event) =>
                              onBlocksChange(
                                updateTableColumnHeader(
                                  allBlocks,
                                  block.id,
                                  columnIndex,
                                  event.currentTarget.value,
                                ),
                              )
                            }
                            className="rounded-xl bg-slate-900/60 px-3 py-2 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              onBlocksChange(removeTableColumn(allBlocks, block.id, columnIndex))
                            }
                            disabled={block.columns.length <= 1}
                            className={cn(
                              'rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10',
                              block.columns.length <= 1 && 'cursor-not-allowed opacity-40',
                            )}
                            aria-label={`Remove column ${columnIndex + 1}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${block.id}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`cell-${block.id}-${rowIndex}-${cellIndex}`} className="border border-white/10 p-2">
                          <TextInput
                            value={cell}
                            onChange={(event) =>
                              onBlocksChange(
                                updateTableCell(
                                  allBlocks,
                                  block.id,
                                  rowIndex,
                                  cellIndex,
                                  event.currentTarget.value,
                                ),
                              )
                            }
                            className="rounded-xl bg-slate-900/60 px-3 py-2 text-xs"
                          />
                        </td>
                      ))}
                      <td className="border border-white/10 p-2">
                        <button
                          type="button"
                          onClick={() => onBlocksChange(removeTableRow(allBlocks, block.id, rowIndex))}
                          disabled={block.rows.length <= 1}
                          className={cn(
                            'rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10',
                            block.rows.length <= 1 && 'cursor-not-allowed opacity-40',
                          )}
                          aria-label={`Remove row ${rowIndex + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {block.type === 'image' ? (
          <div className="space-y-4">
            <Field label={en.technicalEditor.captionLabel}>
              <TextareaInput
                rows={3}
                value={block.caption}
                onChange={(event) => updateBlock({ ...block, caption: event.currentTarget.value })}
                placeholder={en.placeholders.imageCaption}
              />
            </Field>

            <Field label={en.technicalEditor.uploadImage}>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-slate-300 transition hover:bg-white/10">
                <ImagePlus size={18} />
                <span>{en.technicalEditor.imageHint}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Field>
          </div>
        ) : null}
      </div>
    </article>
  );
};

