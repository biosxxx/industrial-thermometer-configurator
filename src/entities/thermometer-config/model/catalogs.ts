import type {
  ConnectionDesignOption,
  NominalSize,
  RangePreset,
  StemDiameter,
  TemperatureUnit,
  ThermometerFilling,
  ThermowellDesign,
  ThermowellType,
} from '@/entities/thermometer-config/model/types';

export const NOMINAL_SIZES: readonly NominalSize[] = [63, 100, 160];

export const TEMPERATURE_UNITS: readonly TemperatureUnit[] = ['degC', 'degF'];

export const RANGE_PRESETS: readonly RangePreset[] = [
  { min: -50, max: 50, label: '-50...+50' },
  { min: -30, max: 50, label: '-30...+50' },
  { min: 0, max: 60, label: '0...60' },
  { min: 0, max: 100, label: '0...100' },
  { min: 0, max: 120, label: '0...120' },
  { min: 0, max: 160, label: '0...160' },
  { min: 0, max: 200, label: '0...200' },
  { min: 0, max: 250, label: '0...250' },
  { min: 0, max: 300, label: '0...300' },
  { min: 0, max: 400, label: '0...400' },
  { min: 0, max: 500, label: '0...500' },
  { min: 0, max: 600, label: '0...600' },
];

export const STEM_DIAMETERS: readonly StemDiameter[] = [6, 8, 10];

export const STEM_LENGTHS = [63, 100, 160, 200, 250, 300, 400, 500, 600, 800, 1000] as const;

export const CONNECTION_DESIGNS: readonly ConnectionDesignOption[] = [
  { id: 'Standard', label: 'Standard (Fixed Thread)' },
  { id: 'Design 1', label: 'Design 1 (Plain Stem)' },
  { id: 'Design 2', label: 'Design 2 (Male Nut)' },
  { id: 'Design 3', label: 'Design 3 (Union Nut)' },
  { id: 'Design 4', label: 'Design 4 (Compression Fitting)' },
];

export const CONNECTION_STANDARDS = [
  'G 1/2 B',
  '1/2 NPT',
  'M18x1,5',
  'M20x1.5',
  'M27x2',
  'G 3/4 B',
  '1/2 BSP',
] as const;

export const CASE_FILLINGS: readonly ThermometerFilling[] = ['Dry', 'Silicone oil'];

export const CASE_MATERIALS = [
  'Stainless steel 1.4301 (304)',
  'Stainless steel 1.4404 (316)',
] as const;

export const STEM_MATERIALS = [
  'Stainless steel 316L',
  'Stainless steel 316Ti',
  'Monel 400',
] as const;

export const THERMOWELL_TYPES: readonly ThermowellType[] = ['Solid Machined', 'Fabricated'];

export const THERMOWELL_DESIGNS: readonly ThermowellDesign[] = ['Tapered', 'Straight', 'Stepped'];

export const THERMOWELL_MATERIALS = [
  'Stainless steel 316Ti',
  'Stainless steel 316L',
  'Hastelloy C276',
  'Monel 400',
] as const;

export const THERMOMETER_WINDOWS = ['Safety glass'] as const;
