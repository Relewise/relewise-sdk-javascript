/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleDirectories: ['node_modules'],
    transform: {
        '^.+\\.[tj]sx?$': ['ts-jest', {
            useESM: true,
            tsconfig: {
                allowJs: true,
                esModuleInterop: true,
                types: ['jest', 'node']
            }
        }]
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@relewise)/)',
        '../lib/dist/cjs/relewise-client.js',
    ],
};
