export default ({ Vue }) => {
  import('../../src')
    .then(module => {
      const SelectWrapper = module.default
      Vue.use(SelectWrapper)
    })
    .catch(e => {})

  import('@laomao800/vue-demo-box')
    .then(module => {
      const DemoBox = module.default
      Vue.use(DemoBox, {
        jsRes: [
          '//unpkg.com/vue/dist/vue.js',
          '//unpkg.com/@laomao800/vue-select-wrapper/dist/vue-select-wrapper.umd.min.js'
        ]
      })
    })
    .catch(e => {})
}
