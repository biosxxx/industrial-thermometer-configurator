import { buildPdfPayload } from '@/entities/thermometer-config/lib/build-pdf-payload';
import { deriveAccuracyClass } from '@/entities/thermometer-config/lib/derive-accuracy';
import { deriveModelName } from '@/entities/thermometer-config/lib/derive-model';
import { deriveVisualLayout } from '@/entities/thermometer-config/lib/derive-visual-layout';
import { RANGE_PRESETS } from '@/entities/thermometer-config/model/catalogs';
import type { PreviewBadge, ThermometerConfiguratorState } from '@/entities/thermometer-config/model/types';

export const selectModelName = (config: ThermometerConfiguratorState) => deriveModelName(config.case.filling);

export const selectAccuracyClass = (config: ThermometerConfiguratorState) =>
  deriveAccuracyClass(config.nominalSize);

export const selectRangeLabel = (config: ThermometerConfiguratorState) =>
  `${config.rangeMin} ... ${config.rangeMax} ${config.unit}`;

export const selectRangePreset = (config: ThermometerConfiguratorState) =>
  RANGE_PRESETS.find((preset) => preset.min === config.rangeMin && preset.max === config.rangeMax) ?? null;

export const selectVisualLayout = (config: ThermometerConfiguratorState) => deriveVisualLayout(config);

export const selectPreviewBadges = (config: ThermometerConfiguratorState): PreviewBadge[] => {
  const badges: PreviewBadge[] = [
    { label: `NS ${config.nominalSize} mm`, tone: 'neutral' },
    { label: `Range ${config.rangeMin}..${config.rangeMax} ${config.unit}`, tone: 'neutral' },
    { label: `Stem L ${config.stem.length} mm / D ${config.stem.diameter} mm`, tone: 'neutral' },
    {
      label:
        config.connection.location === 'Lower'
          ? 'Radial stem'
          : config.connection.location === 'Back'
            ? 'Back connection'
            : 'Every-angle stem',
      tone: 'info',
    },
  ];

  if (config.project.tagNumber.trim()) {
    badges.push({ label: `Tag ${config.project.tagNumber.trim()}`, tone: 'accent' });
  }

  if (config.accessories.thermowell.enabled) {
    badges.push({
      label: `Thermowell ${config.accessories.thermowell.design} U ${config.accessories.thermowell.insertionLength} mm`,
      tone: 'warning',
    });
  }

  return badges;
};

export const selectPdfPayload = (config: ThermometerConfiguratorState) => buildPdfPayload(config);

export const selectIsRangeValid = (config: ThermometerConfiguratorState) =>
  Number.isFinite(config.rangeMin) &&
  Number.isFinite(config.rangeMax) &&
  config.rangeMax > config.rangeMin;

export const selectHasCriticalValidationErrors = (config: ThermometerConfiguratorState) =>
  !selectIsRangeValid(config) || config.stem.length <= 0 || config.accessories.thermowell.insertionLength <= 0;
