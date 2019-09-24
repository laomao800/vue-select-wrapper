<template>
  <SelectWrapper
    v-model="selection"
    :close-on-select="false"
    placeholder="Select single value"
  >
    <div style="padding:15px">
      <label style="margin-right:10px">
        <input v-model="selection" name="single" type="radio" value="value1" />
        value1
      </label>
      <label style="margin-right:10px">
        <input v-model="selection" name="single" type="radio" value="value2" />
        value2
      </label>
      <label style="margin-right:10px">
        <input v-model="selection" name="single" type="radio" value="value3" />
        value3
      </label>
      <label style="margin-right:10px">
        <input v-model="selection" name="single" type="radio" value="value4" />
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
