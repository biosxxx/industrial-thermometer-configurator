import { deriveModelName } from '@/entities/thermometer-config/lib/derive-model';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';
import { thermometerConfiguratorHydrationSchema } from '@/entities/thermometer-config/model/schema';
import type { ThermometerConfiguratorState } from '@/entities/thermometer-config/model/types';

type PartialConfig = Partial<ThermometerConfiguratorState>;

const sanitizeNumber = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);

export const withDerivedFields = (config: ThermometerConfiguratorState): ThermometerConfiguratorState => ({
  ...config,
  rangeMin: sanitizeNumber(config.rangeMin, defaultThermometerConfiguratorState.rangeMin),
  rangeMax: sanitizeNumber(config.rangeMax, defaultThermometerConfiguratorState.rangeMax),
  stem: {
    ...config.stem,
    length: sanitizeNumber(config.stem.length, defaultThermometerConfiguratorState.stem.length),
  },
  accessories: {
    thermowell: {
      ...config.accessories.thermowell,
      insertionLength: sanitizeNumber(
        config.accessories.thermowell.insertionLength,
        defaultThermometerConfiguratorState.accessories.thermowell.insertionLength,
      ),
      extensionLength: sanitizeNumber(
        config.accessories.thermowell.extensionLength,
        defaultThermometerConfiguratorState.accessories.thermowell.extensionLength,
      ),
    },
  },
  model: deriveModelName(config.case.filling),
});

export const normalizeConfig = (payload: unknown): ThermometerConfiguratorState => {
  const parsed = thermometerConfiguratorHydrationSchema.safeParse(payload);

  if (!parsed.success) {
    return defaultThermometerConfiguratorState;
  }

  const merged: ThermometerConfiguratorState = {
    ...defaultThermometerConfiguratorState,
    ...(parsed.data as PartialConfig),
    stem: {
      ...defaultThermometerConfiguratorState.stem,
      ...parsed.data.stem,
      diameter: (parsed.data.stem?.diameter ??
        defaultThermometerConfiguratorState.stem.diameter) as ThermometerConfiguratorState['stem']['diameter'],
    },
    connection: {
      ...defaultThermometerConfiguratorState.connection,
      ...parsed.data.connection,
    },
    case: {
      ...defaultThermometerConfiguratorState.case,
      ...parsed.data.case,
    },
    accessories: {
      thermowell: {
        ...defaultThermometerConfiguratorState.accessories.thermowell,
        ...parsed.data.accessories?.thermowell,
      },
    },
    options: {
      ...defaultThermometerConfiguratorState.options,
      ...parsed.data.options,
    },
    project: {
      ...defaultThermometerConfiguratorState.project,
      ...parsed.data.project,
    },
    technicalContent: parsed.data.technicalContent ?? defaultThermometerConfiguratorState.technicalContent,
  };

  return withDerivedFields(merged);
};
