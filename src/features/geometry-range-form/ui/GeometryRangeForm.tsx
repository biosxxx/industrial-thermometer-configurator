import { useMemo, useState } from 'react';
import { Droplets, Maximize2, PencilLine } from 'lucide-react';
import {
  CASE_FILLINGS,
  CASE_MATERIALS,
  NOMINAL_SIZES,
  RANGE_PRESETS,
  TEMPERATURE_UNITS,
} from '@/entities/thermometer-config/model/catalogs';
import { selectIsRangeValid, selectRangePreset } from '@/entities/thermometer-config/model/selectors';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { en } from '@/shared/i18n';
import { toSafeNumber } from '@/shared/lib/format';
import { ChoiceButton } from '@/shared/ui/ChoiceButton';
import { Field } from '@/shared/ui/Field';
import { SectionCard } from '@/shared/ui/SectionCard';
import { SelectInput } from '@/shared/ui/SelectInput';
import { TextInput } from '@/shared/ui/TextInput';

export const GeometryRangeForm = () => {
  const config = useThermometerConfiguratorStore((state) => state.config);
  const setField = useThermometerConfiguratorStore((state) => state.setField);
  const setCaseField = useThermometerConfiguratorStore((state) => state.setCaseField);
  const setRangePreset = useThermometerConfiguratorStore((state) => state.setRangePreset);
  const setCustomRange = useThermometerConfiguratorStore((state) => state.setCustomRange);
  const setFilling = useThermometerConfiguratorStore((state) => state.setFilling);

  const activePreset = useMemo(() => selectRangePreset(config), [config]);
  const [isCustomRange, setIsCustomRange] = useState(activePreset === null);
  const isRangeValid = selectIsRangeValid(config);

  const handleToggleRangeMode = () => {
    if (isCustomRange) {
      setIsCustomRange(false);
      if (!activePreset) {
        setRangePreset(RANGE_PRESETS[3]);
      }
      return;
    }

    setIsCustomRange(true);
  };

  return (
    <SectionCard title={en.sections.geometryRange} icon={Maximize2} accentClass="text-orange-400">
      <div className="space-y-5">
        <Field label={en.labels.nominalSize}>
          <div className="grid grid-cols-3 gap-2">
            {NOMINAL_SIZES.map((size) => (
              <ChoiceButton
                key={size}
                selected={config.nominalSize === size}
                onClick={() => setField('nominalSize', size)}
              >
                {size} mm
              </ChoiceButton>
            ))}
          </div>
        </Field>

        <div className="grid gap-3 md:grid-cols-[minmax(130px,160px)_1fr]">
          <Field label={en.labels.unit} htmlFor="temperature-unit">
            <SelectInput
              id="temperature-unit"
              value={config.unit}
              onChange={(event) => setField('unit', event.currentTarget.value as typeof config.unit)}
            >
              {TEMPERATURE_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field
            label={en.labels.range}
            htmlFor="range-preset"
            action={
              <button
                type="button"
                onClick={handleToggleRangeMode}
                className="flex items-center gap-1 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 transition hover:text-white"
              >
                <PencilLine size={10} />
                {isCustomRange ? en.actions.selectStandard : en.actions.setCustom}
              </button>
            }
          >
            {isCustomRange ? (
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={config.rangeMin}
                  onChange={(event) =>
                    setCustomRange(toSafeNumber(event.currentTarget.valueAsNumber, 0), config.rangeMax)
                  }
                  placeholder={en.placeholders.min}
                />
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={config.rangeMax}
                  onChange={(event) =>
                    setCustomRange(config.rangeMin, toSafeNumber(event.currentTarget.valueAsNumber, 0))
                  }
                  placeholder={en.placeholders.max}
                />
              </div>
            ) : (
              <SelectInput
                id="range-preset"
                value={activePreset?.label ?? ''}
                onChange={(event) => {
                  const nextPreset = RANGE_PRESETS.find((preset) => preset.label === event.currentTarget.value);
                  if (nextPreset) {
                    setRangePreset(nextPreset);
                  }
                }}
              >
                {RANGE_PRESETS.map((preset) => (
                  <option key={preset.label} value={preset.label}>
                    {preset.label}
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>
        </div>

        {!isRangeValid ? <p className="text-sm text-rose-300">{en.header.exportHint}</p> : null}

        <Field label={en.labels.caseMaterial} htmlFor="case-material">
          <SelectInput
            id="case-material"
            value={config.case.material}
            onChange={(event) => setCaseField('material', event.currentTarget.value as typeof config.case.material)}
          >
            {CASE_MATERIALS.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label={en.labels.caseFilling}>
          <div className="grid grid-cols-2 gap-2">
            {CASE_FILLINGS.map((filling) => (
              <ChoiceButton
                key={filling}
                selected={config.case.filling === filling}
                onClick={() => setFilling(filling)}
                className={config.case.filling === filling ? 'border-sky-400 bg-sky-500/15 text-sky-200' : ''}
              >
                <span className="flex items-center justify-center gap-1">
                  <Droplets size={12} />
                  <span>{filling === 'Silicone oil' ? 'Silicone' : filling}</span>
                </span>
              </ChoiceButton>
            ))}
          </div>
        </Field>
      </div>
    </SectionCard>
  );
};
