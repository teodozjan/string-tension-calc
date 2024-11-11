import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{ts,tsx}'],
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{
		plugins: {
			'@stylistic': stylistic,
		},
	},
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		rules: {
			'eqeqeq': ['warn', 'always'],
			'no-empty': 'warn',
			'no-sparse-arrays': 'error',
			'prefer-const': 'warn',
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-quotes': ['warn', 'prefer-single'],
			'@stylistic/key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
			'@stylistic/member-delimiter-style': ['warn', {
				multiline: {delimiter: 'semi', requireLast: true},
				singleline: {delimiter: 'semi', requireLast: false},
			}],
			'@stylistic/object-curly-spacing': ['warn', 'never'],
			'@stylistic/quotes': ['warn', 'single', {avoidEscape: true}],
			'@stylistic/semi': ['warn', 'always'],
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@typescript-eslint/no-unused-vars': ['warn', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_',
			}],
		},
	},
];
