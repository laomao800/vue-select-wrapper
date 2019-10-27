<template>
  <div class="inline-wrap">
    <select-wrapper v-model="value1" :multiple="true" placeholder="Select multiple value">
      <div class="option-wrap">
        <label v-for="option in options" :key="option">
          <input v-model="value1" name="multiple" type="checkbox" :value="option" />
          {{ option }}
        </label>
      </div>
    </select-wrapper>
    <select-wrapper
      v-model="value2"
      :multiple="true"
      :limit="2"
      placeholder="Select multiple value"
    >
      <div class="option-wrap">
        <label v-for="option in options" :key="option">
          <input v-model="value2" name="multiple" type="checkbox" :value="option" />
          {{ option }}
        </label>
      </div>
    </select-wrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [],
      value2: [],
      options: ['value1', 'value2', 'value3', 'value4', 'value5']
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
