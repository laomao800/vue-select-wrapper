# vue-select-wrapper

A basic Vue.js Component that can wrap anything as a dropdown type selector.

## Install

```bash
# yarn
yarn add @laomao800/vue-select-wrapper

# npm
npm install --save @laomao800/vue-select-wrapper
```

## Documentation

<https://laomao800.github.io/vue-select-wrapper/>

## Props

| prop             | type          | default              | description                                                                                                                    |
| ---------------- | ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| value/v-model    | any           | `undefined`          | Binding value. Should be an array when `multiple:true`                                                                         |
| multiple         | boolean       | `false`              | whether use multiple-select                                                                                                    |
| placeholder      | string        | `''`                 | placeholder                                                                                                                    |
| append-to-body   | boolean       | `true`               | Append the dropdown element to `<body>`                                                                                        |
| dropdown-width   | number/string | `undefined`          | Width of the dropdown element. If not provided, the trigger element's width will be used.                                      |
| dropdown-z-index | number        | `1000`               | Dropdown element z-index                                                                                                       |
| disabled         | boolean       | `false`              | Disable the component                                                                                                          |
| size             | string        | `''`                 | Component size. Could be `medium/small/mini`                                                                                   |
| clearable        | boolean       | `false`              | Whether select can be cleared                                                                                                  |
| limit            | number        | `Infinity`           | Limit the number of selected options displayed, must be greater than `0`. The rest will be hidden within the limitText string. |
| limit-text       | function      | count => `+${count}` | Function that processes the message shown when selected elements pass the defined limit.                                       |
| popper-class     | string        | `''`                 | Custom class name for the dropdown                                                                                             |
| loading          | boolean       | `false`              | Whether the dropdown is display the loading status                                                                             |
| loading-text     | string        | `'Loading'`          | Text in the dropdown while loading                                                                                             |
| close-on-select  | boolean       | -                    | Close a dropdown when an option is chosen. default: single mode `true` , multiple mode `false` .                               |

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

| Event          | Description                                  | Parameters                                  |
| -------------- | -------------------------------------------- | ------------------------------------------- |
| change         | Trigger on value change                      | (newVal)                                    |
| visible-change | Trigger on dropdown toggle                   | (visible) `true` for show, `false` for hide |
| clear          | Click the clear icon or execute clearValue() | -                                           |
