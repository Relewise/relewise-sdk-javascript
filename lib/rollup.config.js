import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import externalGlobals from "rollup-plugin-external-globals";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    output: {
      name: "Relewise",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
    },
    external: ['cross-fetch', 'cross-fetch/polyfill'],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
      resolve(),
      commonjs(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
	    { file: "dist/relewise.min.js", format: "umd", name: "Relewise", plugins: [terser()] },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      externalGlobals({
        "cross-fetch": "fetch",
      })],
  },
];
