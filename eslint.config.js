import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json'
            },
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            'indent': ['error', 4],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'argsIgnorePattern': '^_',
                    'varsIgnorePattern': '^_',
                    'ignoreRestSiblings': true,
                    'args': 'after-used'
                }
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 2 }],
            'eol-last': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
            'space-before-blocks': ['error', 'always'],
            'keyword-spacing': ['error', { 'before': true, 'after': true }]
        }
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        }
    },
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'prisma/migrations/**',
            'init-db/**',
            'scripts/**'
        ]
    }
];
