module.exports = {
    root: true,
    env: {
        'es6': true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: 0,
        'no-extra-semi': 0,
        'comma-dangle': ['error', 'always-multiline'], // Reasoning behind using dangling commas -> https://github.com/airbnb/javascript#commas--dangling
        'no-useless-constructor': 'off', 
        'standard/no-callback-literal': 'off',
        eqeqeq: ['error', 'smart'],
        'no-return-assign': 'off',
        'prefer-promise-reject-errors': 'off',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'space-before-function-paren': ['error', 'never'],
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
};