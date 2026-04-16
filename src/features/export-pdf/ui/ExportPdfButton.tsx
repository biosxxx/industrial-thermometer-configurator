import { useState, type RefObject } from 'react';
import { Download } from 'lucide-react';
import { selectHasCriticalValidationErrors } from '@/entities/thermometer-config/model/selectors';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { exportThermometerDatasheet } from '@/entities/pdf-datasheet/lib/export-thermometer-datasheet';
import { en } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';

type ExportPdfButtonProps = {
  previewRef: RefObject<HTMLDivElement>;
};

export const ExportPdfButton = ({ previewRef }: ExportPdfButtonProps) => {
  const config = useThermometerConfiguratorStore((state) => state.config);
  const hasValidationError = selectHasCriticalValidationErrors(config);
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExport = async () => {
    if (!previewRef.current || hasValidationError) {
      return;
    }

    setIsExporting(true);
    setErrorMessage(null);

    try {
      await exportThermometerDatasheet(config, previewRef.current);
    } catch (error) {
      console.error(error);
      setErrorMessage(en.header.exportError);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting || hasValidationError}
        className={cn(
          'group inline-flex items-center gap-3 rounded-3xl px-6 py-4 text-sm font-bold transition-all',
          hasValidationError
            ? 'cursor-not-allowed bg-slate-700 text-slate-400'
            : 'bg-white text-slate-950 shadow-xl hover:bg-orange-500 hover:text-white active:scale-[0.99]',
        )}
      >
        <Download size={18} />
        <span>{isExporting ? 'Generating...' : en.header.downloadPdf}</span>
      </button>

      {hasValidationError ? <p className="text-sm text-rose-300">{en.header.exportHint}</p> : null}
      {!hasValidationError && errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
    </div>
  );
};

