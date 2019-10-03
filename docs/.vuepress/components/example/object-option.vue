<template>
  <select-wrapper
    v-model="selection"
    :multiple="true"
    placeholder="Select months"
    style="width:540px;"
  >
    <template slot="value-template" slot-scope="{ value }">
      {{ value.short }}
    </template>
    <div style="padding:15px 0 15px 15px;">
      <label
        v-for="month in months"
        :key="month.value"
        style="display:inline-block;width:22%;margin-right:10px"
      >
        <input
          type="checkbox"
          :checked="selection.indexOf(month) > -1"
          @change="handleMonthSelect($event, month)"
        />
        {{ month.label }}
      </label>
    </div>
  </select-wrapper>
</template>

<script>
export default {
  data() {
    return {
      selection: [],
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
        this.selection.push(month)
      } else {
        const index = this.selection.indexOf(month)(
          selection => selection === month
        )
        if (index > -1) {
          this.selection.splice(index, 1)
        }
      }
    }
  }
}
</script>
