import { describe, expect, it } from 'vitest';
import { deriveModelName } from '@/entities/thermometer-config/lib/derive-model';

describe('deriveModelName', () => {
  it('returns TG-Industrial for dry filling', () => {
    expect(deriveModelName('Dry')).toBe('TG-Industrial');
  });

  it('returns TG-Vibro for liquid filling', () => {
    expect(deriveModelName('Silicone oil')).toBe('TG-Vibro');
  });
});
