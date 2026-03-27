import { defineConfig } from 'vitest/config';
import nodePath from 'path';
import { fileURLToPath } from 'url';

const rootDir = nodePath.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    globals: true,
    fileParallelism: false,
    setupFiles: ['./test_utils/setup.js'],
    coverage: {
      include: ['lib/**/*.{js,jsx}'],
      exclude: ['lib/cli/blueprint/**/*', 'lib/cli.js'],
      reporter: ['text', 'html'],
    },
  },
});
