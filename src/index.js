import SelectWrapper from './SelectWrapper'

SelectWrapper.install = function(Vue) {
  Vue.component(SelectWrapper.name, SelectWrapper)
}

if (typeof window !== 'undefined' && window.Vue) {
  SelectWrapper.install(window.Vue)
}

export default SelectWrapper
