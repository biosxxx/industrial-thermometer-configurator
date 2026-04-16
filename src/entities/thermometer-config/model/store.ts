import { create } from 'zustand';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';
import { normalizeConfig, withDerivedFields } from '@/entities/thermometer-config/lib/normalize-config';
import type {
  AccessoryKey,
  BooleanOptionKey,
  RangePreset,
  StemDiameter,
  ThermometerConfiguratorState,
  ThermometerFilling,
} from '@/entities/thermometer-config/model/types';

type ThermometerConfiguratorStore = {
  config: ThermometerConfiguratorState;
  setField: <K extends keyof ThermometerConfiguratorState>(
    field: K,
    value: ThermometerConfiguratorState[K],
  ) => void;
  setProjectField: <K extends keyof ThermometerConfiguratorState['project']>(
    field: K,
    value: ThermometerConfiguratorState['project'][K],
  ) => void;
  setCaseField: <K extends keyof ThermometerConfiguratorState['case']>(
    field: K,
    value: ThermometerConfiguratorState['case'][K],
  ) => void;
  setStemField: <K extends keyof ThermometerConfiguratorState['stem']>(
    field: K,
    value: ThermometerConfiguratorState['stem'][K],
  ) => void;
  setConnectionField: <K extends keyof ThermometerConfiguratorState['connection']>(
    field: K,
    value: ThermometerConfiguratorState['connection'][K],
  ) => void;
  setAccessoryField: (
    accessory: AccessoryKey,
    field: keyof ThermometerConfiguratorState['accessories'][AccessoryKey],
    value: string | number | boolean,
  ) => void;
  toggleAccessory: (accessory: AccessoryKey) => void;
  toggleOption: (option: BooleanOptionKey) => void;
  setRangePreset: (preset: RangePreset) => void;
  setCustomRange: (min: number, max: number) => void;
  setFilling: (filling: ThermometerFilling) => void;
  resetToDefaults: () => void;
  hydrateFromPayload: (payload: unknown) => void;
};

const safeNumber = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);
const isStemDiameter = (value: number): value is StemDiameter => value === 6 || value === 8 || value === 10;

export const useThermometerConfiguratorStore = create<ThermometerConfiguratorStore>((set) => ({
  config: defaultThermometerConfiguratorState,
  setField: (field, value) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        [field]: value,
      }),
    })),
  setProjectField: (field, value) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        project: {
          ...state.config.project,
          [field]: value,
        },
      }),
    })),
  setCaseField: (field, value) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        case: {
          ...state.config.case,
          [field]: value,
        },
      }),
    })),
  setStemField: (field, value) =>
    set((state) => {
      const nextLength =
        field === 'length' ? safeNumber(value as number, state.config.stem.length) : state.config.stem.length;
      const nextDiameter =
        field === 'diameter' && isStemDiameter(value as number)
          ? (value as StemDiameter)
          : state.config.stem.diameter;

      return {
        config: withDerivedFields({
          ...state.config,
          stem: {
            ...state.config.stem,
            ...(field === 'length' ? { length: nextLength } : null),
            ...(field === 'diameter' ? { diameter: nextDiameter } : null),
            ...(field === 'material' ? { material: value as string } : null),
          },
          accessories: {
            ...state.config.accessories,
            thermowell: {
              ...state.config.accessories.thermowell,
              ...(field === 'length' ? { insertionLength: nextLength } : null),
            },
          },
        }),
      };
    }),
  setConnectionField: (field, value) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        connection: {
          ...state.config.connection,
          [field]: value,
        },
      }),
    })),
  setAccessoryField: (accessory, field, value) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        accessories: {
          ...state.config.accessories,
          [accessory]: {
            ...state.config.accessories[accessory],
            [field]: value,
          },
        },
      }),
    })),
  toggleAccessory: (accessory) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        accessories: {
          ...state.config.accessories,
          [accessory]: {
            ...state.config.accessories[accessory],
            enabled: !state.config.accessories[accessory].enabled,
          },
        },
      }),
    })),
  toggleOption: (option) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        options: {
          ...state.config.options,
          [option]: !state.config.options[option],
        },
      }),
    })),
  setRangePreset: (preset) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        rangeMin: preset.min,
        rangeMax: preset.max,
      }),
    })),
  setCustomRange: (min, max) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        rangeMin: safeNumber(min, state.config.rangeMin),
        rangeMax: safeNumber(max, state.config.rangeMax),
      }),
    })),
  setFilling: (filling) =>
    set((state) => ({
      config: withDerivedFields({
        ...state.config,
        case: {
          ...state.config.case,
          filling,
        },
      }),
    })),
  resetToDefaults: () => set({ config: defaultThermometerConfiguratorState }),
  hydrateFromPayload: (payload) => set({ config: normalizeConfig(payload) }),
}));
