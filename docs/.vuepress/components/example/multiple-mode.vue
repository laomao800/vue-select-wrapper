<template>
  <div class="inline-wrap">
    <SelectWrapper
      v-model="selection1"
      :multiple="true"
      placeholder="Select multiple value"
    >
      <div class="option-wrap">
        <label v-for="option in options" :key="option">
          <input v-model="selection1" name="multiple" type="checkbox" :value="option" />
          {{ option }}
        </label>
      </div>
    </SelectWrapper>
    <SelectWrapper
      v-model="selection2"
      :multiple="true"
      :limit="2"
      placeholder="Select multiple value"
    >
      <div class="option-wrap">
        <label v-for="option in options" :key="option">
          <input v-model="selection2" name="multiple" type="checkbox" :value="option" />
          {{ option }}
        </label>
      </div>
    </SelectWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selection1: [],
      selection2: [],
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

<style scoped>
.inline-wrap > * {
  width: 320px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: top;
}
.option-wrap {
  padding: 10px;
}
.option-wrap label {
  display: inline-block;
  line-height: 1.6em;
  width: 32%;
}
</style>
