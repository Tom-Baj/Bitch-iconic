// Basic ESLint config so the VS Code ESLint extension and `eslint .` both work
// Adjust rules later as needed.
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    ignores: ['node_modules/**', 'dist/**'],
    rules: {
      // keep rules minimal to start; customize as desired
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
    extends: [js.configs.recommended],
  },
];


