
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default {
  root: projectRoot,

  resolve: {
    alias: {
      '@': projectRoot,
    },
  },

  esbuild: {
    jsx: 'automatic',
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
};
