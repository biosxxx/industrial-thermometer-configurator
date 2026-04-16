import { describe, expect, it } from 'vitest';
import { buildPdfPayload } from '@/entities/thermometer-config/lib/build-pdf-payload';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';

describe('buildPdfPayload', () => {
  it('maps state into export sections and file name', () => {
    const payload = buildPdfPayload(
      {
        ...defaultThermometerConfiguratorState,
        project: {
          ...defaultThermometerConfiguratorState.project,
          orderNumber: 'REF-001',
          operatorName: 'Acme Plant',
        },
      },
      new Date('2026-04-16T10:00:00Z'),
    );

    expect(payload.fileName).toBe('Thermometer_Spec_REF-001.pdf');
    expect(payload.sections.projectData[1]).toEqual({
      label: 'Order Number',
      value: 'REF-001',
    });
    expect(payload.sections.technicalSpecifications[0].value).toBe('TG-Industrial');
    expect(payload.sections.stemConnection[0].value).toBe('Radial (Lower)');
  });

  it('uses safe fallback values for empty text fields', () => {
    const payload = buildPdfPayload({
      ...defaultThermometerConfiguratorState,
      project: {
        ...defaultThermometerConfiguratorState.project,
        orderNumber: '',
      },
      otherTechnicalParams: '',
    });

    expect(payload.fileName).toBe('Thermometer_Spec_Draft.pdf');
    expect(payload.technicalParameters).toBe('-');
  });
});
