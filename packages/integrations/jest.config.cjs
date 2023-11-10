/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleDirectories: ['node_modules'],
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@relewise)/)',
        '../lib/dist/cjs/relewise-integrations.js',
    ],
    globals: {
        'ts-jest': {
            tsconfig: {
                allowJs: true,
            },
        },
    },
};