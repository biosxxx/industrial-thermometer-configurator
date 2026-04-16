import { describe, expect, it } from 'vitest';
import { deriveAccuracyClass } from '@/entities/thermometer-config/lib/derive-accuracy';

describe('deriveAccuracyClass', () => {
  it('returns class 1 for NS 63', () => {
    expect(deriveAccuracyClass(63)).toBe('1');
  });

  it('returns class 1 for larger thermometers too', () => {
    expect(deriveAccuracyClass(100)).toBe('1');
    expect(deriveAccuracyClass(160)).toBe('1');
  });
});
