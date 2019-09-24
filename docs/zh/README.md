---
sidebar: auto
---

# Vue select wrapper

可将任意内容包装为下拉选择类型组件。

<!-- markdownlint-disable MD033 -->

<client-only>

## Example

### 单选模式

绑定值可任意。

<example-single-mode />

### 多选模式

绑定值为数组类型。

<example-multiple-mode />

### 不同尺寸

`size` 支持 `medium/small/mini` 设置不同尺寸。

<example-different-size />

### 可清空

包含清空按钮，可将选择器清空绑定值清空，多选模式清空为 `[]` ，单选模式下清空为 `undefined`

<example-clearable />

### Object 类型选项

如果选中值为 Object 类型，可通过 `value-template` 的 slot 自定义显示选中值的格式

<example-object-option />

### 选择后自动收起

默认单选模式下选中后会自动收起下拉，多选模式则不会，可通过 `close-on-select` 设置该行为。

<example-close-on-select />

### 与其他组件配合

可以与任意组件组合，如与 [vue-item-list-selector](https://github.com/laomao800/vue-item-list-selector) 配合使用。

<example-with-item-list />

</client-only>

## Props

| prop             | type          | default     | description                                                                             |
| ---------------- | ------------- | ----------- | --------------------------------------------------------------------------------------- |
| value/v-model    | any           | `undefined` | 绑定值                                                                                  |
| multiple         | boolean       | `false`     | 是否使用多选模式                                                                        |
| placeholder      | string        | `''`        | placeholder                                                                             |
| append-to-body   | boolean       | `true`      | 下拉弹出元素是否插入于 `<body>` 内                                                      |
| dropdown-width   | number/string | `undefined` | 下拉弹出元素宽度，若不设置则与触发元素相同宽度。                                        |
| dropdown-z-index | number        | `1000`      | 下拉弹出元素的 z-index 值                                                               |
| disabled         | boolean       | `false`     | 是否禁用                                                                                |
| size             | string        | `''`        | 控件尺寸，可选值 `medium/small/mini`                                                    |
| clearable        | boolean       | `false`     | 是否启用清空所有选项功能                                                                |
| collapse-tags    | boolean       | `false`     | 多选模式时是否折叠已选选项，若传入数字可表示指定显示出来的选项数量                      |
| popper-class     | string        | `''`        | 下拉弹出元素 class 名                                                                   |
| loading          | boolean       | `false`     | 下拉元素是否显示为加载中状态                                                            |
| loading-text     | string        | `'加载中'`  | 下拉元素加载状态时显示的文字                                                            |
| close-on-select  | boolean       | -           | 选择选项后是否自动收起下拉，可显示传值更改。默认：单选模式 `true` ，多选模式 `false` 。 |

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
