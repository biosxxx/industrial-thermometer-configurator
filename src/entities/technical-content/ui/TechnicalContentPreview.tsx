import type { TechnicalContentBlock } from '@/entities/thermometer-config/model/types';
import { cn } from '@/shared/lib/cn';

type TechnicalContentPreviewProps = {
  technicalParameters: string;
  blocks: TechnicalContentBlock[];
  variant?: 'panel' | 'document';
  className?: string;
  emptyStateText?: string;
};

const blockSurfaceClass = {
  panel: 'border-white/6 bg-white/5',
  document: 'border-slate-200 bg-white',
} as const;

const textToneClass = {
  panel: {
    title: 'text-slate-100',
    text: 'text-slate-200',
    muted: 'text-slate-400',
    tableHeader: 'bg-slate-800/70 text-slate-100',
    tableCell: 'bg-slate-950/20 text-slate-200',
    imagePlaceholder: 'bg-slate-950/20 text-slate-500',
  },
  document: {
    title: 'text-slate-900',
    text: 'text-slate-700',
    muted: 'text-slate-400',
    tableHeader: 'bg-slate-100 text-slate-700',
    tableCell: 'bg-white text-slate-700',
    imagePlaceholder: 'bg-slate-100 text-slate-400',
  },
} as const;

const renderTableCell = (
  value: string,
  key: string,
  variant: NonNullable<TechnicalContentPreviewProps['variant']>,
  isHeader = false,
) => (
  <td
    key={key}
    className={cn(
      'border px-3 py-2 align-top text-xs',
      isHeader
        ? textToneClass[variant].tableHeader
        : `${textToneClass[variant].tableCell} border-slate-200/60`,
    )}
  >
    {value || '\u2014'}
  </td>
);

export const TechnicalContentPreview = ({
  technicalParameters,
  blocks,
  variant = 'panel',
  className,
  emptyStateText = 'Add screenshots, notes, or tables in the expanded editor.',
}: TechnicalContentPreviewProps) => {
  const tones = textToneClass[variant];
  const surface = blockSurfaceClass[variant];

  return (
    <div className={cn('space-y-4', className)}>
      <section className={cn('rounded-3xl border p-4', surface)}>
        <div className={cn('mb-2 text-[10px] font-bold uppercase tracking-[0.18em]', tones.muted)}>
          Base technical note
        </div>
        <div className={cn('whitespace-pre-wrap text-sm leading-6', tones.text)}>
          {technicalParameters.trim() || emptyStateText}
        </div>
      </section>

      {blocks.map((block) => (
        <section key={block.id} className={cn('rounded-3xl border p-4', surface)}>
          <div className={cn('mb-3 text-sm font-black uppercase tracking-[0.16em]', tones.title)}>
            {block.title || (block.type === 'table' ? 'Specification table' : 'Untitled block')}
          </div>

          {block.type === 'text' ? (
            <div className={cn('whitespace-pre-wrap text-sm leading-6', tones.text)}>
              {block.text.trim() || 'Add text in the editor.'}
            </div>
          ) : null}

          {block.type === 'table' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr>
                    {block.columns.map((column, index) =>
                      renderTableCell(column || `Column ${index + 1}`, `head-${index}`, variant, true),
                    )}
                  </tr>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {row.map((cell, cellIndex) =>
                        renderTableCell(cell, `cell-${rowIndex}-${cellIndex}`, variant),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {block.type === 'image' ? (
            <div className="space-y-3">
              {block.src ? (
                <img
                  src={block.src}
                  alt={block.caption || block.title || 'Technical reference'}
                  className="max-h-[320px] w-full rounded-2xl border border-slate-200/70 object-contain"
                />
              ) : (
                <div
                  className={cn(
                    'flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm',
                    tones.imagePlaceholder,
                  )}
                >
                  Upload a screenshot to preview it here.
                </div>
              )}

              {block.caption.trim() ? (
                <div className={cn('text-sm leading-6', tones.text)}>{block.caption}</div>
              ) : null}
            </div>
          ) : null}
        </section>
      ))}

      {!blocks.length ? (
        <div
          className={cn(
            'rounded-3xl border border-dashed p-4 text-sm leading-6',
            variant === 'panel' ? 'border-white/10 text-slate-400' : 'border-slate-300 text-slate-500',
          )}
        >
          {emptyStateText}
        </div>
      ) : null}
    </div>
  );
};

