import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import less from 'rollup-plugin-less'
import autoprefixer from 'autoprefixer'

const version = process.env.VERSION || require('./package.json').version
const banner =
  '/**\n' +
  ' * @preserve\n' +
  ` * @laomao800/vue-select-wrapper v${version}\n` +
  ' */'

const commonConfig = {
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    less(),
    vue({
      style: {
        postcssPlugins: [autoprefixer()]
      }
    }),
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
}

export default [
  {
    ...commonConfig,
    output: {
      format: 'cjs',
      file: 'dist/vue-select-wrapper.common.js',
      banner
    }
  },
  {
    ...commonConfig,
    output: {
      format: 'umd',
      file: 'dist/vue-select-wrapper.umd.js',
      name: 'vue-select-wrapper',
      banner
    }
  },
  {
    ...commonConfig,
    output: {
      format: 'umd',
      file: 'dist/vue-select-wrapper.umd.min.js',
      name: 'vue-select-wrapper',
      banner
    },
    plugins: [
      ...commonConfig.plugins,
      uglify({
        output: {
          // https://github.com/TrySound/rollup-plugin-uglify#comments
          comments: function (node, comment) {
            if (comment.type === "comment2") {
              return /@preserve|@license|@cc_on/i.test(comment.value)
            }
            return false
          }
        }
      })
    ]
  }
]
