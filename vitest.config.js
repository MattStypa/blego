import { defineConfig } from 'vitest/config';
import nodePath from 'path';
import { fileURLToPath } from 'url';

const rootDir = nodePath.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      lib: nodePath.resolve(rootDir, 'lib'),
      jest_utils: nodePath.resolve(rootDir, 'jest_utils'),
      'core.js': nodePath.resolve(rootDir, 'core.js'),
    },
  },
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    globals: true,
    fileParallelism: false,
    maxWorkers: 1,
    clearMocks: true,
    setupFiles: ['./jest_utils/setup.js'],
    coverage: {
      include: ['lib/**/*.{js,jsx}'],
      exclude: ['lib/cli/blueprint/**/*', 'lib/cli.js'],
      reporter: ['text', 'html'],
    },
  },
});
