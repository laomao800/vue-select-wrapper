export default ({ Vue }) => {
  import('../../src')
    .then(module => {
      const SelectWrapper = module.default
      Vue.use(SelectWrapper)
    })
    .catch(e => {})
}
