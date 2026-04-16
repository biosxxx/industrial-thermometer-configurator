import { useState } from 'react';
import { Box, PencilLine } from 'lucide-react';
import {
  CONNECTION_STANDARDS,
  STEM_LENGTHS,
  THERMOWELL_DESIGNS,
  THERMOWELL_MATERIALS,
  THERMOWELL_TYPES,
} from '@/entities/thermometer-config/model/catalogs';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { en } from '@/shared/i18n';
import { toSafeNumber } from '@/shared/lib/format';
import { Field } from '@/shared/ui/Field';
import { SectionCard } from '@/shared/ui/SectionCard';
import { SelectInput } from '@/shared/ui/SelectInput';
import { TextInput } from '@/shared/ui/TextInput';
import { ToggleSwitch } from '@/shared/ui/ToggleSwitch';

export const AccessoriesForm = () => {
  const thermowell = useThermometerConfiguratorStore((state) => state.config.accessories.thermowell);
  const toggleAccessory = useThermometerConfiguratorStore((state) => state.toggleAccessory);
  const setAccessoryField = useThermometerConfiguratorStore((state) => state.setAccessoryField);
  const [isCustomWellLength, setIsCustomWellLength] = useState(false);

  return (
    <SectionCard title={en.sections.accessories} icon={Box} accentClass="text-cyan-400">
      <div className="space-y-4">
        <div className="space-y-3 rounded-3xl border border-white/5 bg-white/4 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
              {en.labels.thermowellEnabled}
            </p>
            <ToggleSwitch
              checked={thermowell.enabled}
              onChange={() => toggleAccessory('thermowell')}
              label={en.accessories.thermowell}
            />
          </div>

          {thermowell.enabled ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label={en.labels.thermowellInsertionLength}
                action={
                  <button
                    type="button"
                    onClick={() => setIsCustomWellLength((value) => !value)}
                    className="flex items-center gap-1 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 transition hover:text-white"
                  >
                    <PencilLine size={10} />
                    {isCustomWellLength ? en.actions.selectStandard : en.actions.setCustom}
                  </button>
                }
              >
                {isCustomWellLength ? (
                  <TextInput
                    type="number"
                    inputMode="decimal"
                    value={thermowell.insertionLength}
                    onChange={(event) =>
                      setAccessoryField(
                        'thermowell',
                        'insertionLength',
                        toSafeNumber(event.currentTarget.valueAsNumber, 100),
                      )
                    }
                    placeholder={en.placeholders.length}
                  />
                ) : (
                  <SelectInput
                    value={thermowell.insertionLength}
                    onChange={(event) =>
                      setAccessoryField('thermowell', 'insertionLength', Number(event.currentTarget.value))
                    }
                  >
                    {STEM_LENGTHS.map((length) => (
                      <option key={length} value={length}>
                        {length} mm
                      </option>
                    ))}
                  </SelectInput>
                )}
              </Field>

              <Field label={en.labels.thermowellExtensionLength} htmlFor="thermowell-extension">
                <TextInput
                  id="thermowell-extension"
                  type="number"
                  inputMode="decimal"
                  value={thermowell.extensionLength}
                  onChange={(event) =>
                    setAccessoryField(
                      'thermowell',
                      'extensionLength',
                      toSafeNumber(event.currentTarget.valueAsNumber, 0),
                    )
                  }
                  placeholder="0"
                />
              </Field>

              <Field label={en.labels.thermowellDesign} htmlFor="thermowell-design">
                <SelectInput
                  id="thermowell-design"
                  value={thermowell.design}
                  onChange={(event) =>
                    setAccessoryField('thermowell', 'design', event.currentTarget.value as typeof thermowell.design)
                  }
                >
                  {THERMOWELL_DESIGNS.map((design) => (
                    <option key={design} value={design}>
                      {design}
                    </option>
                  ))}
                </SelectInput>
              </Field>

              <Field label={en.labels.thermowellType} htmlFor="thermowell-type">
                <SelectInput
                  id="thermowell-type"
                  value={thermowell.type}
                  onChange={(event) =>
                    setAccessoryField('thermowell', 'type', event.currentTarget.value as typeof thermowell.type)
                  }
                >
                  {THERMOWELL_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </SelectInput>
              </Field>

              <Field label={en.labels.thermowellMaterial} htmlFor="thermowell-material">
                <SelectInput
                  id="thermowell-material"
                  value={thermowell.material}
                  onChange={(event) =>
                    setAccessoryField('thermowell', 'material', event.currentTarget.value as typeof thermowell.material)
                  }
                >
                  {THERMOWELL_MATERIALS.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </SelectInput>
              </Field>

              <Field label={en.labels.processConnection} htmlFor="thermowell-process-connection">
                <SelectInput
                  id="thermowell-process-connection"
                  value={thermowell.processConnection}
                  onChange={(event) =>
                    setAccessoryField(
                      'thermowell',
                      'processConnection',
                      event.currentTarget.value as typeof thermowell.processConnection,
                    )
                  }
                >
                  {CONNECTION_STANDARDS.map((standard) => (
                    <option key={standard} value={standard}>
                      {standard}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
          ) : null}
        </div>
      </div>
    </SectionCard>
  );
};
