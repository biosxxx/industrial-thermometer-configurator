export const formatScaleNumber = (value: number) =>
  Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.?0+$/, '');

export const toSafeNumber = (value: number, fallback = 0) => (Number.isFinite(value) ? value : fallback);

