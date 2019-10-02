---
sidebar: auto
---

<!-- markdownlint-disable MD033 -->
<style>
.db__wrapper { margin-top: 16px; }
</style>

# Vue select wrapper

A basic Vue.js Component that can wrap anything as a dropdown type selector.

<client-only>

## Example

### Single mode

<demo-box title="Single mode">

Bind the selected value with `v-model`.

<example-single-mode slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/single-mode.vue{3}

</div>

</demo-box>

### Multiple mode

<demo-box title="Multiple mode">

Should provide an array value in multiple-select.

Use `limit` to limit display selected.

<example-multiple-mode slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/multiple-mode.vue{5,23}

</div>

</demo-box>

### Different size

<demo-box title="Different size">

`size` could be `medium/small/mini`

<example-different-size slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/different-size.vue

</div>

</demo-box>

### Clearable

<demo-box title="Clearable">

Can clear value by using the clear icon.

Multi-select mode is cleared to `[]`, and the single-select mode is cleared to `undefined`

<example-clearable slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/clearable.vue{9}

</div>

</demo-box>

### Object value

<demo-box title="Object value">

When the chosen is an object. The slot `value-template` could use to custom content of the chosen values.

<example-object-option slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/object-option.vue{8-10}

</div>

</demo-box>

### Close on select

<demo-box title="Close on select">

Close a dropdown when an option is chosen.

**Default: single mode `true` , multiple mode `false` .**

<example-close-on-select slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/close-on-select.vue{4}

</div>

</demo-box>

### With other components

<demo-box title="With other components">

e.g. [vue-item-list-selector](https://github.com/laomao800/vue-item-list-selector)

<example-with-item-list slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/with-item-list.vue

</div>

</demo-box>

</client-only>

## Props

| prop | type | default | description |
| --- | --- | --- | --- |
| value/v-model | any | `undefined` | Binding value. Should be an array when `multiple:true` |
| multiple | boolean | `false` | whether use multiple-select |
| placeholder | string | `''` | placeholder |
| append-to-body | boolean | `true` | Append the dropdown element to `<body>` |
| dropdown-width | number/string | `undefined` | Width of the dropdown element. If not provided, the trigger element's width will be used. |
| dropdown-z-index | number | `1000` | Dropdown element z-index |
| disabled | boolean | `false` | Disable the component |
| size | string | `''` | Component size. Could be `medium/small/mini` |
| clearable | boolean | `false` | Whether select can be cleared |
| limit | number | `Infinity` | Limit the number of selected options displayed, must be greater than `0`. The rest will be hidden within the limitText. |
| limit-text | function | count => \`+\${count}\` | Function that processes the message shown when selected elements pass the defined limit. |
| popper-class | string | `''` | Custom class name for the dropdown |
| loading | boolean | `false` | Whether the dropdown is display the loading status |
| loading-text | string | `'Loading'` | Text in the dropdown while loading |
| close-on-select | boolean | - | Close a dropdown when an option is chosen. **Default: single mode `true` , multiple mode `false` .** |

## Slots

### value-template

Custom content of the chosen values. Works in both single-select and multi-select modes.

```vue
<SelectWrapper v-model="selection">
  <template slot="value-template" slot-scope="{ value }">
    {{ value.valueProperty }}
  </template>
</SelectWrapper>
```

## Methods

| Methods          | Description              |
| ---------------- | ------------------------ |
| showDropdown()   | Show the dropdown        |
| hideDropdown()   | Hide the dropdown        |
| toggleDropdown() | Toggle the dropdown      |
| clearValue()     | Clear all value          |
| updatePopper()   | Update dropdown position |

## Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Trigger on value change | (newVal) |
| visible-change | Trigger on dropdown toggle | (visible) `true` for show, `false` for hide |
| clear | Click the clear icon or execute clearValue() | - |
