import path from 'path'
import fs from 'fs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import html from '@rollup/plugin-html'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import hql from 'hashql/rollup'

const isProd = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'client/src/index.jsx',
  output: {
    file: 'client/dist/index.js',
    format: 'iife',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      ),
    }),
    resolve({
      extensions,
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react/index.js': [
          'createRef',
          'useState',
          'useRef',
          'useEffect',
          'useCallback',
          'useMemo',
          'memo',
        ],
      },
    }),
    hql({
      tags: ['sql'],
      output: (x) =>
        fs.writeFileSync(
          path.join(__dirname, '../server/queries.json'),
          JSON.stringify(x, null, 2)
        ),
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-proposal-object-rest-spread',
          {
            useBuiltIns: true,
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        ],
      ],
    }),
    html({
      fileName: 'index.html',
      title: 'HashQL Starter 🌝',
      template: ({ title }) => {
        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="/index.css">
          </head>
          <body>
            <div id="app"></div>
            <script src="/index.js"></script>
          </body>
          </html>
        `
      },
    }),
    isProd && terser(),
    !isProd &&
      serve({
        host: 'localhost',
        port: 3000,
        open: true,
        contentBase: ['client/dist'],
      }),
    !isProd &&
      livereload({
        watch: 'client/dist',
      }),
  ],
}
