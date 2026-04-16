import type { ThermometerFilling } from '@/entities/thermometer-config/model/types';

export const deriveModelName = (filling: ThermometerFilling) =>
  filling === 'Dry' ? 'TG-Industrial' : 'TG-Vibro';
