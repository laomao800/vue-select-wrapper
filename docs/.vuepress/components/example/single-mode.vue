<template>
  <SelectWrapper
    v-model="selection"
    clearable
    placeholder="Select single value"
  >
    <div style="padding:15px">
      <label v-for="option in options" :key="option" style="margin-right:10px">
        <input v-model="selection" name="single" type="radio" :value="option" />
        {{ option }}
      </label>
    </div>
  </SelectWrapper>
</template>

<script>
export default {
  data() {
    return {
      selection: '',
      options: [
        'value1',
        'value2',
        'value3',
        'value4',
        'value5',
      ]
    }
  }
}
</script>
