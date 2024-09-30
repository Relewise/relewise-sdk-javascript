import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import pkg from './package.json' with { type: "json" };;

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    {
        input: 'src/index.ts',
        output: [
            { file: pkg.main, format: 'cjs', sourcemap: true },
            { file: pkg.module, format: 'es', sourcemap: true },
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig.json' }),
            json(),
            resolve(),
            commonjs(),
        ],
    },
];
