<template>
  <select-wrapper
    v-model="value"
    :close-on-select="false"
    placeholder="Select single value"
    style="width:320px;"
  >
    <div class="option-wrap">
      <label v-for="option in options" :key="option">
        <input v-model="value" name="single" type="radio" :value="option" />
        {{ option }}
      </label>
    </div>
  </select-wrapper>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: ['value1', 'value2', 'value3', 'value4', 'value5']
    }
  }
}
</script>

<style scoped>
.option-wrap {
  padding: 10px;
}
.option-wrap label {
  display: inline-block;
  line-height: 1.6em;
  width: 32%;
}
</style>
