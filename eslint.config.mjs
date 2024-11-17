// @ts-check
import { fileURLToPath } from 'node:url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import path from 'node:path';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends('next/core-web-vitals'),
]);

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  {
    // Ignore patterns
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      'coverage/**',
    ],
  },
  // Configs
  {
    rules: {
      // TypeScript and React rules
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'react/no-unescaped-entities': 'off', // Avoids errors with apostrophes and quotes in JSX

      // Code style rules
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ], // Single quotes in JavaScript
      'jsx-quotes': ['error', 'prefer-double'], // Enforce double quotes in JSX

      // Prettier integration
      'prettier/prettier': ['error'], // Enforce Prettier formatting

      // Best practices
      curly: ['error'], // Requires curly braces in control structures
      semi: ['error', 'always'], // Enforces semicolons
      'default-case': 'error', // Ensures there is a default case in switch statements
      'no-console': ['error', { allow: ['warn', 'error'] }], // Only allows console.warn and console.error
      'no-duplicate-imports': ['error'], // Prevents duplicate imports
      'no-var': 'error', // Enforces let/const instead of var
    },
  },
];

export default config;
