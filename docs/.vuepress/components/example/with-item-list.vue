<template>
  <select-wrapper
    v-model="selection"
    :multiple="true"
    placeholder="Select Items"
    style="width:320px;"
    @visible-change="onVisibleChange"
  >
    <template slot="value-template" slot-scope="{ value }">
      {{ value.label }}
    </template>
    <ItemListSelector
      ref="itemListSelector"
      v-model="selection"
      :data="listData"
    />
  </select-wrapper>
</template>

<script>
function _randomText(length = 20) {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  components: {
    ItemListSelector: () => import('@laomao800/vue-item-list-selector')
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
    onVisibleChange(visible) {
      if (visible) {
        this.$nextTick().then(() => {
          this.$refs.itemListSelector.$el
            .querySelector('.item-selector__searchbar input')
            .focus()
        })
      }
    }
  }
}
</script>
