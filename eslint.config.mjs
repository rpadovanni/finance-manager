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
      'src/components/ui/**',
      'src/components/hooks/**',
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
      'jsx-quotes': ['error', 'prefer-double'], // Enforce double quotes in JSX
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ], // Single quotes in JavaScript
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
        },
      ], // Max line length

      // Prettier integration
      'prettier/prettier': ['error'], // Enforce Prettier formatting

      // Best practices
      curly: ['error'], // Requires curly braces in control structures
      semi: ['error', 'always'], // Enforces semicolons
      'default-case': 'error', // Ensures there is a default case in switch statements
      'no-console': ['error', { allow: ['warn', 'error'] }], // Only allows console.warn and console.error
      'no-duplicate-imports': ['error'], // Prevents duplicate imports
      'no-var': 'error', // Enforces let/const instead of var
      'no-dupe-else-if': 'error', // Disallow duplicate else-if blocks
      'no-eval': 'error', // Disallow the use of eval()
      'no-eq-null': 'error', // Disallow null comparisons without type-checking operators
      'no-else-return': 'error', // Disallow else blocks after return statements in if statements
      'no-import-assign': 'error', // Disallow assignment to imported bindings
      'no-multi-spaces': 'error', // Disallow multiple spaces
      'no-setter-return': 'error', // Disallow returning value from setters
      'no-throw-literal': 'error', // Disallow throwing literals as exceptions
      'no-useless-concat': 'error', // Disallow unnecessary concatenation of literals or template literals
    },
  },
];

export default config;
