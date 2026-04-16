import { describe, expect, it } from 'vitest';
import { getDevAppDirectoryPath, getDevAppPath, normalizeDevMountPath } from '../../config/dev-path';

describe('dev path helpers', () => {
  it('normalizes empty and slash-only mount paths to root', () => {
    expect(normalizeDevMountPath()).toBe('');
    expect(normalizeDevMountPath('')).toBe('');
    expect(normalizeDevMountPath('/')).toBe('');
  });

  it('adds leading slash and strips trailing slashes', () => {
    expect(normalizeDevMountPath('utility-apps/industrial-thermometer-configurator/')).toBe(
      '/utility-apps/industrial-thermometer-configurator',
    );
  });

  it('builds mounted app and directory paths from env', () => {
    const env = {
      APP_DEV_MOUNT_PATH: '/utility-apps/industrial-thermometer-configurator/',
    } as NodeJS.ProcessEnv;

    expect(getDevAppPath(env)).toBe('/utility-apps/industrial-thermometer-configurator/app.html');
    expect(getDevAppDirectoryPath(env)).toBe('/utility-apps/industrial-thermometer-configurator/');
  });
});
