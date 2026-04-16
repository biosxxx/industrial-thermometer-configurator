import { deriveAccuracyClass } from '@/entities/thermometer-config/lib/derive-accuracy';
import { deriveModelName } from '@/entities/thermometer-config/lib/derive-model';
import type { PdfPayload, ThermometerConfiguratorState } from '@/entities/thermometer-config/model/types';

const safeText = (value: string | number | boolean | null | undefined, fallback = '-') =>
  `${value ?? ''}`.trim() || fallback;

export const buildPdfPayload = (
  config: ThermometerConfiguratorState,
  generatedAt: Date = new Date(),
): PdfPayload => {
  const modelName = deriveModelName(config.case.filling);
  const orderNumber = config.project.orderNumber.trim();

  return {
    fileName: `Thermometer_Spec_${orderNumber || 'Draft'}.pdf`,
    sections: {
      projectData: [
        { label: 'Tag Number', value: safeText(config.project.tagNumber) },
        { label: 'Order Number', value: safeText(orderNumber) },
        { label: 'Customer', value: safeText(config.project.operatorName) },
        { label: 'Date', value: generatedAt.toLocaleDateString('en-US') },
      ],
      technicalSpecifications: [
        { label: 'Model', value: modelName },
        { label: 'Nominal Size', value: `NS ${config.nominalSize} mm` },
        { label: 'Scale Range', value: `${config.rangeMin} ... ${config.rangeMax} ${config.unit}` },
        { label: 'Accuracy Class', value: deriveAccuracyClass(config.nominalSize) },
        { label: 'Case Filling', value: config.case.filling },
        { label: 'Window', value: config.case.window },
      ],
      stemConnection: [
        {
          label: 'Mounting',
          value:
            config.connection.location === 'Lower'
              ? 'Radial (Lower)'
              : config.connection.location === 'Back'
                ? 'Axial (Back)'
                : 'Adjustable angle',
        },
        { label: 'Connection Design', value: config.connection.design },
        {
          label: 'Process Connection',
          value: config.connection.design === 'Design 1' ? 'Plain stem / no thread' : config.connection.standard,
        },
        { label: 'Stem Length (L1)', value: `${config.stem.length} mm` },
        { label: 'Stem Diameter', value: `${config.stem.diameter} mm` },
        { label: 'Stem Material', value: config.stem.material },
        { label: 'Case Material', value: config.case.material },
      ],
      thermowell: [
        {
          label: 'Thermowell',
          value: config.accessories.thermowell.enabled
            ? `${config.accessories.thermowell.type} / ${config.accessories.thermowell.design}`
            : 'None',
        },
        {
          label: 'Process Connection',
          value: config.accessories.thermowell.enabled
            ? config.accessories.thermowell.processConnection
            : '-',
        },
        {
          label: 'Insertion Length (U)',
          value: config.accessories.thermowell.enabled
            ? `${config.accessories.thermowell.insertionLength} mm`
            : '-',
        },
        {
          label: 'Extension Length (T)',
          value: config.accessories.thermowell.enabled
            ? `${config.accessories.thermowell.extensionLength} mm`
            : '-',
        },
        {
          label: 'Material',
          value: config.accessories.thermowell.enabled ? config.accessories.thermowell.material : '-',
        },
      ],
      options: [
        { label: 'Red Set Pointer', value: config.options.redPointer ? 'Yes' : 'No' },
        { label: 'Drag Pointer', value: config.options.dragPointer ? 'Yes' : 'No' },
        {
          label: 'Calibration Certificate',
          value: config.options.calibrationCert ? 'Included' : 'No',
        },
      ],
    },
    technicalParameters: config.otherTechnicalParams.trim() || '-',
    technicalContent: config.technicalContent,
    sketchNotes: [
      '* Dimensions are for reference only. See official catalog for exact details.',
      '* Generated from the standalone Industrial Thermometer Configurator.',
    ],
  };
};
