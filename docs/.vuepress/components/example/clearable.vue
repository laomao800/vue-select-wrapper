<template>
  <div class="inline-wrap">
    <div>
      <div style="margin-bottom:0.4em;">value: {{ value1 }}</div>
      <select-wrapper
        v-model="value1"
        :multiple="true"
        :limit="2"
        clearable
        placeholder="Select multiple value"
      >
        <div class="option-wrap">
          <label v-for="option in options" :key="option">
            <input v-model="value1" name="multiple" type="checkbox" :value="option" />
            {{ option }}
          </label>
        </div>
      </select-wrapper>
    </div>
    <div>
      <div style="margin-bottom:0.4em;">value: {{ value2 }}</div>
      <select-wrapper v-model="value2" clearable placeholder="Select single value">
        <div class="option-wrap">
          <label v-for="option in options" :key="option">
            <input v-model="value2" name="single" type="radio" :value="option" />
            {{ option }}
          </label>
        </div>
      </select-wrapper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [],
      value2: undefined,
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
