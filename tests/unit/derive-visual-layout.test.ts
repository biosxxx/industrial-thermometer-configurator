import { describe, expect, it } from 'vitest';
import { deriveVisualLayout } from '@/entities/thermometer-config/lib/derive-visual-layout';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';

describe('deriveVisualLayout', () => {
  it('uses the lower radial default layout', () => {
    const layout = deriveVisualLayout(defaultThermometerConfiguratorState);

    expect(layout.cy).toBe(232);
    expect(layout.scale).toBe(1);
    expect(layout.r).toBe(116);
    expect(layout.headRotation).toBe(0);
  });

  it('rotates and lifts the head for adjustable thermometers', () => {
    const layout = deriveVisualLayout({
      ...defaultThermometerConfiguratorState,
      connection: {
        ...defaultThermometerConfiguratorState.connection,
        location: 'Adjustable',
      },
    });

    expect(layout.cy).toBe(220);
    expect(layout.headRotation).toBe(-38);
    expect(layout.hingeOffsetY).toBeGreaterThan(0);
  });

  it('widens the body when a thermowell is enabled', () => {
    const withoutThermowell = deriveVisualLayout(defaultThermometerConfiguratorState);
    const withThermowell = deriveVisualLayout({
      ...defaultThermometerConfiguratorState,
      accessories: {
        thermowell: {
          ...defaultThermometerConfiguratorState.accessories.thermowell,
          enabled: true,
          insertionLength: 400,
        },
      },
    });

    expect(withThermowell.wellWidth).toBeGreaterThan(withoutThermowell.stemWidth);
    expect(withThermowell.stemLen).toBeGreaterThan(withoutThermowell.stemLen);
  });

  it('increases dial radius for NS 160', () => {
    const standard = deriveVisualLayout(defaultThermometerConfiguratorState);
    const large = deriveVisualLayout({
      ...defaultThermometerConfiguratorState,
      nominalSize: 160,
    });

    expect(large.r).toBeGreaterThan(standard.r);
  });
});
