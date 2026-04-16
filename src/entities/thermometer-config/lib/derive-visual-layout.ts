import type { ThermometerConfiguratorState, ThermometerVisualLayout } from '@/entities/thermometer-config/model/types';

const BASE_RADIUS_BY_SIZE: Record<ThermometerConfiguratorState['nominalSize'], number> = {
  63: 82,
  100: 116,
  160: 146,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const deriveVisualLayout = (
  config: ThermometerConfiguratorState,
): ThermometerVisualLayout => {
  const renderLength = config.accessories.thermowell.enabled
    ? config.accessories.thermowell.insertionLength + config.accessories.thermowell.extensionLength
    : config.stem.length;
  const scale = config.nominalSize === 160 ? 1.05 : config.nominalSize === 63 ? 0.88 : 1;
  const radius = BASE_RADIUS_BY_SIZE[config.nominalSize] * scale;
  const stemLen = clamp(renderLength * 0.42, 90, 270);
  const stemWidth = clamp(config.stem.diameter * 1.7, 10, 20);
  const wellWidth = clamp(stemWidth * 2.2, 20, 38);
  const pointerRotation = -42;
  const redPointerRotation = 112;

  return {
    svgSize: 600,
    cx: 300,
    cy:
      config.connection.location === 'Back'
        ? 245
        : config.connection.location === 'Adjustable'
          ? 220
          : 232,
    r: radius,
    rInner: radius * 0.92,
    rDial: radius * 0.84,
    stemLen,
    stemWidth,
    wellWidth,
    backStemLength: clamp(stemLen * 0.72, 70, 190),
    backStemWidth: clamp(stemWidth * 1.65, 14, 28),
    scale,
    pointerRotation,
    redPointerRotation,
    headRotation: config.connection.location === 'Adjustable' ? -38 : 0,
    hingeOffsetY: config.connection.location === 'Adjustable' ? radius + 18 : 0,
    lowerStemStartY: radius - 2,
  };
};
