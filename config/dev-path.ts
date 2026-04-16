const APP_ENTRY_FILE = 'app.html';

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const normalizeDevMountPath = (rawPath?: string) => {
  const value = rawPath?.trim();

  if (!value || value === '/') {
    return '';
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return stripTrailingSlash(withLeadingSlash);
};

export const getDevMountPath = (env: NodeJS.ProcessEnv = process.env) =>
  normalizeDevMountPath(env.APP_DEV_MOUNT_PATH);

export const getDevAppPath = (env: NodeJS.ProcessEnv = process.env) => {
  const mountPath = getDevMountPath(env);
  return mountPath ? `${mountPath}/${APP_ENTRY_FILE}` : `/${APP_ENTRY_FILE}`;
};

export const getDevAppDirectoryPath = (env: NodeJS.ProcessEnv = process.env) => {
  const mountPath = getDevMountPath(env);
  return mountPath ? `${mountPath}/` : '/';
};

