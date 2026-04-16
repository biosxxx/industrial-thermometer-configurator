import type { NominalSize } from '@/entities/thermometer-config/model/types';

export const deriveAccuracyClass = (_nominalSize: NominalSize) => {
  void _nominalSize;
  return '1';
};
