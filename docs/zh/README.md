---
sidebar: auto
---

<!-- markdownlint-disable MD033 -->
<style>
.db__wrapper { margin-top: 16px !important; }
</style>

# Vue select wrapper

可将任意内容包装为下拉选择类型组件。

<client-only>

## Example

### 单选模式

<demo-box title="单选模式">

绑定值可任意。

<example-single-mode slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/single-mode.vue{3}

</div>

</demo-box>

### 多选模式

<demo-box title="多选模式">

绑定值为数组类型。

<example-multiple-mode slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/multiple-mode.vue{5,23}

</div>

</demo-box>

### 不同尺寸

<demo-box title="不同尺寸">

`size` 支持 `medium/small/mini` 设置不同尺寸。

<example-different-size slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/different-size.vue

</div>

</demo-box>

### 可清空

<demo-box title="可清空">

包含清空按钮，可将选择器清空绑定值清空，多选模式清空为 `[]` ，单选模式下清空为 `undefined`

<example-clearable slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/clearable.vue{9}

</div>

</demo-box>

### Object 类型选项

<demo-box title="Object 类型选项">

如果选中值为 Object 类型，可通过 `value-template` 的 slot 自定义显示选中值的格式

<example-object-option slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/object-option.vue{8-10}

</div>

</demo-box>

### 选择后自动收起

<demo-box title="选择后自动收起">

默认单选模式下选中后会自动收起下拉，多选模式则不会，可通过 `close-on-select` 设置该行为。

<example-close-on-select slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/close-on-select.vue{4}

</div>

</demo-box>

### 与其他组件配合

<demo-box title="与其他组件配合" :js-res="['//unpkg.com/@laomao800/vue-item-list-selector@2.x/dist/vue-item-list-selector.umd.min.js']">

可以与任意组件组合，如与 [vue-item-list-selector](https://github.com/laomao800/vue-item-list-selector) 配合使用。

<example-with-item-list slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/with-item-list.vue

</div>

</demo-box>

</client-only>

## Props

| prop             | type          | default                 | description                                                                             |
| ---------------- | ------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| value/v-model    | any           | `undefined`             | 绑定值                                                                                  |
| multiple         | boolean       | `false`                 | 是否使用多选模式                                                                        |
| placeholder      | string        | `''`                    | placeholder                                                                             |
| append-to-body   | boolean       | `true`                  | 下拉弹出元素是否插入于 `<body>` 内                                                      |
| dropdown-width   | number/string | `undefined`             | 下拉弹出元素宽度，若不设置则与触发元素相同宽度。                                        |
| dropdown-z-index | number        | `1000`                  | 下拉弹出元素的 z-index 值                                                               |
| disabled         | boolean       | `false`                 | 是否禁用                                                                                |
| size             | string        | `''`                    | 控件尺寸，可选值 `medium/small/mini`                                                    |
| clearable        | boolean       | `false`                 | 是否启用清空所有选项功能                                                                |
| limit            | number        | `Infinity`              | 限制显示的选项数量，必须大于 `0` 。其余选项会显示为 `limit-text` 所返回的内容。         |
| limit-text       | function      | count => \`+\${count}\` | 当选项超过限制时显示文本的处理方法，参数为剩余选项数量。                                |
| popper-class     | string        | `''`                    | 下拉弹出元素 class 名                                                                   |
| loading          | boolean       | `false`                 | 下拉元素是否显示为加载中状态                                                            |
| loading-text     | string        | `'加载中'`              | 下拉元素加载状态时显示的文字                                                            |
| close-on-select  | boolean       | -                       | 选择选项后是否自动收起下拉，可显示传值更改。默认：单选模式 `true` ，多选模式 `false` 。 |

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
