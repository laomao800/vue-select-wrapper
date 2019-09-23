import Vue, { VueConstructor } from 'vue'

declare class Props extends Vue {
  /** 绑定值 */
  value: any

  /** 是否使用多选模式，默认 `false` */
  multiple: boolean

  /** placeholder */
  placeholder: string

  /** 下拉弹出元素是否插入于 `<body>` 内 */
  appendToBody: boolean

  /** 单独设置下拉部分宽度。不设置则跟随 width */
  dropdownWidth: number | string

  /** 下拉弹出元素的 z-index 值 */
  dropdownZIndex: number

  /** 是否禁用 */
  disabled: boolean

  /** 控件尺寸 */
  size: '' | 'medium' | 'small' | 'mini'

  /** 是否启用清空所有选项功能 */
  clearable: boolean

  /** 多选模式时是否折叠已选选项，若传入数字可表示指定显示出来的选项数量 */
  collapseTags: boolean | number

  /** 下拉弹出元素 class 名 */
  popperClass: string

  /** 下拉元素是否显示为加载中状态 */
  loading: boolean

  /** 下拉元素加载状态时显示的文字 */
  loadingText: string

  /**
   * 选择选项后是否自动收起下拉，可显示传值更改。
   * 默认：单选模式 `true` ，多选模式 `false`
   */
  closeOnSelect: boolean
}

declare class SelectWrapper extends Props {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

export default SelectWrapper
