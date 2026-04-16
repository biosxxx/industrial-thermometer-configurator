import { beforeEach, describe, expect, it } from 'vitest';
import { RANGE_PRESETS } from '@/entities/thermometer-config/model/catalogs';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';

describe('range preset actions', () => {
  beforeEach(() => {
    useThermometerConfiguratorStore.setState((state) => ({
      ...state,
      config: defaultThermometerConfiguratorState,
    }));
  });

  it('applies a preset to range min and max', () => {
    useThermometerConfiguratorStore.getState().setRangePreset(RANGE_PRESETS[3]);

    expect(useThermometerConfiguratorStore.getState().config.rangeMin).toBe(0);
    expect(useThermometerConfiguratorStore.getState().config.rangeMax).toBe(100);
  });

  it('stores custom range values without producing NaN', () => {
    useThermometerConfiguratorStore.getState().setCustomRange(Number.NaN, 25);

    expect(useThermometerConfiguratorStore.getState().config.rangeMin).toBe(0);
    expect(useThermometerConfiguratorStore.getState().config.rangeMax).toBe(25);
  });
});
