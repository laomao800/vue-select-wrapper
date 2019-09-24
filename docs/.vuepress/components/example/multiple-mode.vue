<template>
  <SelectWrapper
    v-model="selection"
    :multiple="true"
    :collapse-tags="2"
    clearable
    placeholder="Select multiple value"
  >
    <div style="padding:15px">
      <label style="margin-right:10px">
        <input
          v-model="selection"
          name="multiple"
          type="checkbox"
          value="value1"
        />
        value1
      </label>
      <label style="margin-right:10px">
        <input
          v-model="selection"
          name="multiple"
          type="checkbox"
          value="value2"
        />
        value2
      </label>
      <label style="margin-right:10px">
        <input
          v-model="selection"
          name="multiple"
          type="checkbox"
          value="value3"
        />
        value3
      </label>
      <label style="margin-right:10px">
        <input
          v-model="selection"
          name="multiple"
          type="checkbox"
          value="value4"
        />
        value4
      </label>
    </div>
  </SelectWrapper>
</template>

<script>
export default {
  data () {
    return {
      selection: ''
    }
  }
}
</script>
