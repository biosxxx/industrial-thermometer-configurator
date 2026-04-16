import { deriveModelName } from '@/entities/thermometer-config/lib/derive-model';
import type { ThermometerConfiguratorState } from '@/entities/thermometer-config/model/types';

const defaultFilling = 'Dry';

export const defaultThermometerConfiguratorState: ThermometerConfiguratorState = {
  model: deriveModelName(defaultFilling),
  nominalSize: 100,
  unit: 'degC',
  rangeMin: 0,
  rangeMax: 100,
  stem: {
    length: 100,
    diameter: 8,
    material: 'Stainless steel 316L',
  },
  connection: {
    location: 'Lower',
    design: 'Standard',
    standard: 'G 1/2 B',
  },
  case: {
    material: 'Stainless steel 1.4301 (304)',
    filling: defaultFilling,
    window: 'Safety glass',
  },
  accessories: {
    thermowell: {
      enabled: false,
      type: 'Solid Machined',
      design: 'Tapered',
      material: 'Stainless steel 316Ti',
      processConnection: 'G 1/2 B',
      insertionLength: 100,
      extensionLength: 0,
    },
  },
  options: {
    redPointer: false,
    dragPointer: false,
    calibrationCert: true,
  },
  project: {
    tagNumber: '',
    medium: 'Liquid/Gas',
    standard: 'EN 13190',
    certificates: 'EN 10204 3.1',
    orderNumber: '',
    operatorName: '',
  },
  otherTechnicalParams: `Design: EN 13190
Sensing element: Bimetal coil
Accuracy class: 1 per EN 13190
Stem pressure rating: max. 25 bar (static) without thermowell
Ambient temperature: -40...+70 degC
Ingress protection: IP 65 per IEC/EN 60529
Zero adjustment: External adjustment on case back`,
  technicalContent: [],
};
