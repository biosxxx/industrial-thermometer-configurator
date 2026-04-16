import { z } from 'zod';
import {
  CASE_FILLINGS,
  CASE_MATERIALS,
  CONNECTION_DESIGNS,
  CONNECTION_STANDARDS,
  STEM_MATERIALS,
  TEMPERATURE_UNITS,
  THERMOMETER_WINDOWS,
  THERMOWELL_DESIGNS,
  THERMOWELL_MATERIALS,
  THERMOWELL_TYPES,
} from '@/entities/thermometer-config/model/catalogs';
import { technicalContentBlockSchema } from '@/entities/thermometer-config/lib/technical-content';

const connectionDesignIds = CONNECTION_DESIGNS.map((option) => option.id) as [
  'Standard',
  'Design 1',
  'Design 2',
  'Design 3',
  'Design 4',
];

export const thermometerAccessorySchema = z.object({
  enabled: z.boolean(),
  type: z.enum(THERMOWELL_TYPES),
  design: z.enum(THERMOWELL_DESIGNS),
  material: z.enum(THERMOWELL_MATERIALS),
  processConnection: z.enum(CONNECTION_STANDARDS),
  insertionLength: z.number().finite(),
  extensionLength: z.number().finite(),
});

export const thermometerConfiguratorStateSchema = z.object({
  model: z.string().min(1),
  nominalSize: z.union([z.literal(63), z.literal(100), z.literal(160)]),
  unit: z.enum(TEMPERATURE_UNITS),
  rangeMin: z.number().finite(),
  rangeMax: z.number().finite(),
  stem: z.object({
    length: z.number().finite(),
    diameter: z.union([z.literal(6), z.literal(8), z.literal(10)]),
    material: z.enum(STEM_MATERIALS),
  }),
  connection: z.object({
    location: z.enum(['Lower', 'Back', 'Adjustable']),
    design: z.enum(connectionDesignIds),
    standard: z.enum(CONNECTION_STANDARDS),
  }),
  case: z.object({
    material: z.enum(CASE_MATERIALS),
    filling: z.enum(CASE_FILLINGS),
    window: z.enum(THERMOMETER_WINDOWS),
  }),
  accessories: z.object({
    thermowell: thermometerAccessorySchema,
  }),
  options: z.object({
    redPointer: z.boolean(),
    dragPointer: z.boolean(),
    calibrationCert: z.boolean(),
  }),
  project: z.object({
    tagNumber: z.string(),
    medium: z.string(),
    standard: z.string(),
    certificates: z.string(),
    orderNumber: z.string(),
    operatorName: z.string(),
  }),
  otherTechnicalParams: z.string(),
  technicalContent: z.array(technicalContentBlockSchema),
});

export const thermometerConfiguratorHydrationSchema = thermometerConfiguratorStateSchema.partial({
  model: true,
  nominalSize: true,
  unit: true,
  rangeMin: true,
  rangeMax: true,
  stem: true,
  connection: true,
  case: true,
  accessories: true,
  options: true,
  project: true,
  otherTechnicalParams: true,
  technicalContent: true,
});
