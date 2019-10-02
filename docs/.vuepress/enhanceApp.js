import Vue from 'vue'
import DemoBox from '@laomao800/vue-demo-box'

Vue.use(DemoBox, {
  jsRes: [
    '//unpkg.com/vue/dist/vue.js',
    '//unpkg.com/@laomao800/vue-select-wrapper/dist/vue-select-wrapper.umd.min.js'
  ]
})

export default ({ Vue }) => {
  import('../../src')
    .then(module => {
      const SelectWrapper = module.default
      Vue.use(SelectWrapper)
    })
    .catch(e => {})
}
