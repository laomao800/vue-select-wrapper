<template>
  <SelectWrapper
    v-model="selection"
    :multiple="true"
    placeholder="Select Items"
    @visible-change="onVisibleChange"
  >
    <template slot="value-template" slot-scope="{ value }">
      {{ value.label }}
    </template>
    <ItemListSelector ref="itemListSelector" v-model="selection" :data="listData" />
  </SelectWrapper>
</template>

<script>
import ItemListSelector from '@laomao800/vue-item-list-selector'

function _randomText(length = 20) {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  components: {
    ItemListSelector
  },

  data() {
    return {
      selection: [],
      listData: Array(6000)
        .fill()
        .map((v, i) => ({
          label: `${i} - ${_randomText(6)}`,
          value: i
        }))
    }
  },

  methods: {
    async onVisibleChange(visible) {
      if (visible) {
        await this.$nextTick()
        this.$refs.itemListSelector.$el
          .querySelector('.item-selector__searchbar input')
          .focus()
      }
    },
  }
}
</script>
