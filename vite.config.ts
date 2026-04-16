import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getDevAppDirectoryPath, getDevAppPath } from './config/dev-path';

const devEntryAliasPlugin = (entryPath: string, directoryPath: string): Plugin => ({
  name: 'dev-entry-alias',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      const currentUrl = request.url;

      if (!currentUrl) {
        next();
        return;
      }

      const url = new URL(currentUrl, 'http://localhost');
      const pathname = url.pathname;
      const directoryPathWithoutSlash =
        directoryPath !== '/' ? directoryPath.replace(/\/$/, '') : directoryPath;

      if (pathname === directoryPathWithoutSlash) {
        response.statusCode = 302;
        response.setHeader('Location', `${entryPath}${url.search}`);
        response.end();
        return;
      }

      if (pathname === entryPath) {
        request.url = `/app.html${url.search}`;
      }

      next();
    });
  },
});

export default defineConfig(({ command }) => {
  const devAppPath = getDevAppPath();
  const devAppDirectoryPath = getDevAppDirectoryPath();

  return {
    base: command === 'build' ? './' : '/',
    plugins: [react(), devEntryAliasPlugin(devAppPath, devAppDirectoryPath)],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      open: devAppPath,
    },
    preview: {
      open: '/app.html',
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        input: {
          app: resolve(__dirname, 'app.html'),
        },
      },
    },
  };
});
