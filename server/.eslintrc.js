module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'prettier',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'@typescript-eslint/no-unused-vars': 'warn',
		'import/prefer-default-export': 'off',
		'no-console': 'off',
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: ['state', 'acc'],
			},
		],
	},
};
