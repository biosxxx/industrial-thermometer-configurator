import { useState } from 'react';
import { ArrowDownToLine, CircleDot, Move, PencilLine, Ruler } from 'lucide-react';
import {
  CONNECTION_DESIGNS,
  CONNECTION_STANDARDS,
  STEM_DIAMETERS,
  STEM_LENGTHS,
  STEM_MATERIALS,
} from '@/entities/thermometer-config/model/catalogs';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { en } from '@/shared/i18n';
import { toSafeNumber } from '@/shared/lib/format';
import { ChoiceButton } from '@/shared/ui/ChoiceButton';
import { Field } from '@/shared/ui/Field';
import { SectionCard } from '@/shared/ui/SectionCard';
import { SelectInput } from '@/shared/ui/SelectInput';
import { TextInput } from '@/shared/ui/TextInput';

export const ConnectionMountingForm = () => {
  const config = useThermometerConfiguratorStore((state) => state.config);
  const setStemField = useThermometerConfiguratorStore((state) => state.setStemField);
  const setConnectionField = useThermometerConfiguratorStore((state) => state.setConnectionField);
  const [isCustomStemLength, setIsCustomStemLength] = useState(false);

  return (
    <SectionCard title={en.sections.connectionMounting} icon={Ruler} accentClass="text-emerald-400">
      <div className="space-y-5">
        <Field label={en.labels.connectionLocation}>
          <div className="grid grid-cols-3 gap-3">
            <ChoiceButton
              selected={config.connection.location === 'Lower'}
              onClick={() => setConnectionField('location', 'Lower')}
              className={config.connection.location === 'Lower' ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200' : ''}
              ariaLabel={en.actions.radial}
            >
              <span className="flex flex-col items-center gap-2">
                <ArrowDownToLine size={18} />
                <span>{en.actions.radial}</span>
              </span>
            </ChoiceButton>
            <ChoiceButton
              selected={config.connection.location === 'Back'}
              onClick={() => setConnectionField('location', 'Back')}
              className={config.connection.location === 'Back' ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200' : ''}
              ariaLabel={en.actions.axial}
            >
              <span className="flex flex-col items-center gap-2">
                <CircleDot size={18} />
                <span>{en.actions.axial}</span>
              </span>
            </ChoiceButton>
            <ChoiceButton
              selected={config.connection.location === 'Adjustable'}
              onClick={() => setConnectionField('location', 'Adjustable')}
              className={config.connection.location === 'Adjustable' ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200' : ''}
              ariaLabel={en.actions.adjustable}
            >
              <span className="flex flex-col items-center gap-2">
                <Move size={18} />
                <span>{en.actions.adjustable}</span>
              </span>
            </ChoiceButton>
          </div>
        </Field>

        <Field label={en.labels.connectionDesign} htmlFor="connection-design">
          <SelectInput
            id="connection-design"
            value={config.connection.design}
            onChange={(event) =>
              setConnectionField('design', event.currentTarget.value as typeof config.connection.design)
            }
          >
            {CONNECTION_DESIGNS.map((design) => (
              <option key={design.id} value={design.id}>
                {design.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        {config.connection.design !== 'Design 1' ? (
          <Field label={en.labels.processConnection} htmlFor="process-connection">
            <SelectInput
              id="process-connection"
              value={config.connection.standard}
              onChange={(event) =>
                setConnectionField('standard', event.currentTarget.value as typeof config.connection.standard)
              }
            >
              {CONNECTION_STANDARDS.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
              ))}
            </SelectInput>
          </Field>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label={en.labels.stemLength}
            action={
              <button
                type="button"
                onClick={() => setIsCustomStemLength((value) => !value)}
                className="flex items-center gap-1 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 transition hover:text-white"
              >
                <PencilLine size={10} />
                {isCustomStemLength ? en.actions.selectStandard : en.actions.setCustom}
              </button>
            }
          >
            {isCustomStemLength ? (
              <TextInput
                type="number"
                inputMode="decimal"
                value={config.stem.length}
                onChange={(event) => setStemField('length', toSafeNumber(event.currentTarget.valueAsNumber, 100))}
                placeholder={en.placeholders.length}
              />
            ) : (
              <SelectInput
                value={config.stem.length}
                onChange={(event) => setStemField('length', Number(event.currentTarget.value))}
              >
                {STEM_LENGTHS.map((length) => (
                  <option key={length} value={length}>
                    {length} mm
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>

          <Field label={en.labels.stemDiameter} htmlFor="stem-diameter">
            <SelectInput
              id="stem-diameter"
              value={config.stem.diameter}
              onChange={(event) => setStemField('diameter', Number(event.currentTarget.value) as 6 | 8 | 10)}
            >
              {STEM_DIAMETERS.map((diameter) => (
                <option key={diameter} value={diameter}>
                  {diameter} mm
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>

        <Field label={en.labels.stemMaterial} htmlFor="stem-material">
          <SelectInput
            id="stem-material"
            value={config.stem.material}
            onChange={(event) => setStemField('material', event.currentTarget.value as typeof config.stem.material)}
          >
            {STEM_MATERIALS.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
    </SectionCard>
  );
};
