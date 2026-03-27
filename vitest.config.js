import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: false,
    setupFiles: ['./test_utils/setup.js'],
    coverage: {
      include: ['lib/**/*.{js,jsx}'],
      exclude: ['lib/cli/blueprint/**/*', 'lib/cli.js'],
      reporter: ['text', 'html'],
    },
  },
});
