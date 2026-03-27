import globals from 'globals';
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import vitest from '@vitest/eslint-plugin'

export default defineConfig({
  languageOptions: {
    globals: globals.node,
  },
  plugins: {
    vitest,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...vitest.configs.recommended.rules,
    'no-console': 'off',
  },
})
