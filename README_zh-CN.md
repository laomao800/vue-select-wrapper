# vue-select-wrapper

可将任意内容包装为下拉选择类型组件。

## 安装

```bash
# yarn
yarn add @laomao800/vue-select-wrapper

# npm
npm install --save @laomao800/vue-select-wrapper
```

## 演示文档

<https://laomao800.github.io/vue-select-wrapper/>

## Props

| prop             | type          | default                | description                                                                             |
| ---------------- | ------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| value/v-model    | any           | `undefined`            | 绑定值。多选模式下需提供数组类型                                                        |
| multiple         | boolean       | `false`                | 是否使用多选模式                                                                        |
| placeholder      | string        | `''`                   | placeholder                                                                             |
| append-to-body   | boolean       | `true`                 | 下拉弹出元素是否插入于 `<body>` 内                                                      |
| dropdown-width   | number/string | `undefined`            | 下拉弹出元素宽度，若不设置则与触发元素相同宽度。                                        |
| dropdown-z-index | number        | `1000`                 | 下拉弹出元素的 z-index 值                                                               |
| disabled         | boolean       | `false`                | 是否禁用                                                                                |
| size             | string        | `''`                   | 控件尺寸，可选值 `medium/small/mini`                                                    |
| clearable        | boolean       | `false`                | 是否启用清空所有选项功能                                                                |
| limit            | number        | `Infinity`             | 限制显示的选项数量，必须大于 `0` 。其余选项会显示为 `limit-text` 所返回的内容。         |
| limit-text       | function      | count => \`+${count}\` | 当选项超过限制时显示文本的处理方法，参数为剩余选项数量。                                |
| popper-class     | string        | `''`                   | 下拉弹出元素 class 名                                                                   |
| loading          | boolean       | `false`                | 下拉元素是否显示为加载中状态                                                            |
| loading-text     | string        | `'加载中'`             | 下拉元素加载状态时显示的文字                                                            |
| close-on-select  | boolean       | -                      | 选择选项后是否自动收起下拉，可显示传值更改。默认：单选模式 `true` ，多选模式 `false` 。 |

## Slots

### value-template

可用 `value-template` 已选数据的展示模板，单选与多选模式下都有效。

```vue
<SelectWrapper v-model="selection">
  <template slot="value-template" slot-scope="{ value }">
    {{ value.valueProperty }}
  </template>
</SelectWrapper>
```

## Methods

| Methods          | Description           |
| ---------------- | --------------------- |
| showDropdown()   | 展开下拉              |
| hideDropdown()   | 收起下拉              |
| toggleDropdown() | 切换下拉展开/收起状态 |
| clearValue()     | 清空所有已选项        |
| updatePopper()   | 手动更新下拉元素位置  |

## Events

| Event          | Description       | Parameters                    |
| -------------- | ----------------- | ----------------------------- |
| change         | 选项变化时        | (newVal)                      |
| visible-change | 下拉框出现/隐藏时 | 出现则为 true，隐藏则为 false |
| clear          | 点击清空时        | -                             |
