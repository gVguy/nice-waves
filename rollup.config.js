// rollup.config.js
import fs from 'fs'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
   .readFileSync('./.browserslistrc')
   .toString()
   .split('\n')
   .filter(entry => entry && entry.substring(0, 2) !== 'ie')

const babelBaseConfig = {
   exclude: 'node_modules/**',
   babelHelpers: 'bundled'
}

const baseConfig = {
   input: 'src/main.js',
   plugins: [
      alias({
         entries: [
            {
               find: '@',
               replacement: path.resolve(__dirname, 'src')
            }
         ]
      }),
      resolve(),
      commonjs()
   ]
}

// Customize configs for individual targets
const buildFormats = []

const esConfig = {
   ...baseConfig,
   output: {
      file: 'dist/nice-waves.esm.js',
      format: 'esm'
   },
   plugins: [
      ...baseConfig.plugins,
      babel({
         ...babelBaseConfig,
         presets: [['@babel/preset-env', { targets: esbrowserslist }]]
      })
   ]
}
buildFormats.push(esConfig)

const umdConfig = {
   ...baseConfig,
   output: {
      compact: true,
      file: 'dist/nice-waves.ssr.js',
      format: 'cjs',
      exports: 'default',
      name: 'waves'
   },
   plugins: [...baseConfig.plugins, babel(babelBaseConfig)]
}
buildFormats.push(umdConfig)

const unpkgConfig = {
   input: 'src/main.js',
   output: {
      compact: true,
      file: 'dist/nice-waves.min.js',
      format: 'iife',
      name: 'waves'
   },
   plugins: [
      ...baseConfig.plugins,
      babel(babelBaseConfig),
      terser({
         output: {
            ecma: 5
         }
      })
   ]
}
buildFormats.push(unpkgConfig)

// Export config
export default buildFormats
