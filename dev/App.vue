<template>
  <div id="app">
    <h2>
      Work with
      <a
        href="https://github.com/laomao800/vue-item-list-selector"
        target="_blank"
      >
        vue-item-list-selector
      </a>
    </h2>
    <div class="wrap">
      <div class="selector">
        <SelectWrapper
          v-model="selectionWithList"
          :multiple="true"
          :appendToBody="false"
          :limit="2"
          :limit-text="(count) => `and ${count} more`"
          placeholder="Select Items"
        >
          <template slot="value-template" slot-scope="{ value }">{{
            value.label
          }}</template>
          <ItemListSelector v-model="selectionWithList" :data="listData" />
        </SelectWrapper>
      </div>
      <div class="result">{{ selectionWithList }}</div>
    </div>

    <h2>Different Size</h2>
    <div class="inline-wrap">
      <SelectWrapper placeholder="Default Size">
        <div style="padding:0.4em 1em;">default size</div>
      </SelectWrapper>
      <SelectWrapper placeholder="Medium Size" size="medium">
        <div style="padding:0.4em 1em;">medium size</div>
      </SelectWrapper>
      <SelectWrapper placeholder="Small Size" size="small">
        <div style="padding:0.4em 1em;">small size</div>
      </SelectWrapper>
      <SelectWrapper placeholder="Mini Size" size="mini">
        <div style="padding:0.4em 1em;">mini size</div>
      </SelectWrapper>
    </div>

    <h2>Single selection &amp; clearable</h2>
    <div class="wrap">
      <div class="selector">
        <SelectWrapper
          v-model="selectionSingle"
          placeholder="Select single value"
          clearable
        >
          <div style="padding:15px">
            <label style="margin-right:10px">
              <input
                v-model="selectionSingle"
                name="selectionSingle"
                type="radio"
                value="value1"
              />value1
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionSingle"
                name="selectionSingle"
                type="radio"
                value="value2"
              />value2
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionSingle"
                name="selectionSingle"
                type="radio"
                value="value3"
              />value3
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionSingle"
                name="selectionSingle"
                type="radio"
                value="value4"
              />value4
            </label>
          </div>
        </SelectWrapper>
      </div>
      <div class="result">{{ selectionSingle }}</div>
    </div>

    <h2>Multiple selection &amp; clearable</h2>
    <div class="wrap">
      <div class="selector">
        <SelectWrapper
          v-model="selectionMultiple"
          :multiple="true"
          clearable
          placeholder="Select multiple value"
        >
          <div style="padding:15px">
            <label style="margin-right:10px">
              <input
                v-model="selectionMultiple"
                name="selectionMultiple"
                type="checkbox"
                value="value1"
              />value1
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionMultiple"
                name="selectionMultiple"
                type="checkbox"
                value="value2"
              />value2
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionMultiple"
                name="selectionMultiple"
                type="checkbox"
                value="value3"
              />value3
            </label>
            <label style="margin-right:10px">
              <input
                v-model="selectionMultiple"
                name="selectionMultiple"
                type="checkbox"
                value="value4"
              />value4
            </label>
          </div>
        </SelectWrapper>
      </div>
      <div class="result">{{ selectionMultiple }}</div>
    </div>

    <h2>Object data selection</h2>
    <div class="wrap">
      <div class="selector">
        <SelectWrapper
          v-model="selectionObject"
          :multiple="true"
          placeholder="Select months"
        >
          <template slot="value-template" slot-scope="{ value }">{{
            value.short
          }}</template>
          <div style="padding:15px">
            <label
              v-for="month in months"
              :key="month.value"
              style="display:inline-block;width:30%;margin-right:10px"
            >
              <input
                type="checkbox"
                :checked="selectionObject.indexOf(month) > -1"
                @change="handleMonthSelect($event, month)"
              />
              {{ month.label }}
            </label>
          </div>
        </SelectWrapper>
      </div>
      <div class="result">{{ selectionObject }}</div>
    </div>
  </div>
</template>

<script>
import ItemListSelector from '@laomao800/vue-item-list-selector'
import SelectWrapper from '../src'

function randomText(length = 20) {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  name: 'App',

  components: {
    ItemListSelector,
    SelectWrapper
  },

  data() {
    return {
      listData: Array(6000)
        .fill()
        .map((v, i) => ({
          label: `${i} - ${randomText(3)}`,
          value: i
        })),

      selectionSingle: '',
      selectionMultiple: [],
      selectionObject: [],
      selectionWithList: [],

      months: [
        { label: 'January', short: 'Jan', value: 1 },
        { label: 'February', short: 'Feb', value: 2 },
        { label: 'March', short: 'Mar', value: 3 },
        { label: 'April', short: 'Apr', value: 4 },
        { label: 'May', short: 'May', value: 5 },
        { label: 'June', short: 'Jun', value: 6 },
        { label: 'July', short: 'Jul', value: 7 },
        { label: 'August', short: 'Aug', value: 8 },
        { label: 'September', short: 'Sep', value: 9 },
        { label: 'October', short: 'Oct', value: 10 },
        { label: 'November', short: 'Nov', value: 11 },
        { label: 'December', short: 'Dec', value: 12 }
      ]
    }
  },

  methods: {
    handleMonthSelect($event, month) {
      if ($event.target.checked) {
        this.selectionObject.push(month)
      } else {
        const index = this.selectionObject.findIndex(
          selection => selection === month
        )
        if (index > -1) {
          this.selectionObject.splice(index, 1)
        }
      }
    }
  }
}
</script>

<style>
.wrap {
  display: flex;
}
.selector {
  width: 400px;
}
.result {
  white-space: pre-wrap;
  margin-left: 20px;
  height: 150px;
  overflow: auto;
  padding: 10px;
  flex: 1;
  font-size: 12px;
  border: 1px solid #eee;
}
.inline-wrap > * {
  width: 200px;
  margin-right: 20px;
  display: inline-block;
}
</style>
