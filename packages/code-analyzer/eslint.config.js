const {
    defineConfig,
} = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');

module.exports = defineConfig([{
    languageOptions: {
        globals: {},
        parser: tsParser,
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        parserOptions: {},
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-extra-semi': 0,
        'comma-dangle': ['error', 'always-multiline'],
        'no-useless-constructor': 'off',
        'standard/no-callback-literal': 'off',
        eqeqeq: ['error', 'smart'],
        'no-return-assign': 'off',
        'prefer-promise-reject-errors': 'off',

        'lines-between-class-members': ['error', 'always', {
            exceptAfterSingleLine: true,
        }],

        'space-before-function-paren': ['error', 'never'],
    },
}]);