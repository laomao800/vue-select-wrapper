<template>
  <div
    :class="{
      sw__wrapper: true,
      'sw__wrapper--active': visible,
      'sw__wrapper--disabled': disabled,
      [`sw__wrapper--${size}`]: size
    }"
    v-click-outside="hideDropdown"
  >
    <div ref="trigger" class="sw__trigger" @click="toggleDropdown">
      <div class="sw__selection">
        <div v-if="isEmptyValue" class="sw__placeholder">{{ placeholder }}</div>
        <template v-else>
          <div v-if="multiple" class="sw__multiple">
            <div
              v-for="(row, index) in showingValue"
              :key="index"
              class="sw__tag"
            >
              <span class="sw__tag-text">
                <slot name="value-template" :value="row">{{ row }}</slot>
              </span>
              <span
                v-if="!disabled"
                class="sw__tag-del"
                @click.stop="delValue(index)"
              >
                <i class="sw__icon-close" />
              </span>
            </div>
            <div
              v-if="limit && value.length > limit"
              class="sw__tag sw__tag-limit"
            >
              {{ limitText(value.length - limit) }}
            </div>
          </div>
          <div v-else class="sw__single">
            <div class="sw__tag-text">
              <slot name="value-template" :value="value">{{ value }}</slot>
            </div>
          </div>
        </template>
      </div>
      <div v-if="!disabled" class="sw__suffix">
        <i class="sw__icon-arrow-down" />
        <span
          v-if="clearable && !isEmptyValue"
          class="sw__clear"
          @click.stop="clearValue"
        >
          <i class="sw__icon-close" />
        </span>
      </div>
    </div>
    <div
      ref="popupContainer"
      v-show="visible"
      :class="['sw__dropdown', popperClass]"
      :style="popupComputedStyle"
      @click.stop
    >
      <div v-if="loading" class="sw__loading">{{ loadingText }}</div>
      <div v-show="!loading"><slot /></div>
    </div>
  </div>
</template>

<style lang="less" src="./style.less"></style>

<script>
import hasValue from 'has-values'
import parseSize from '@laomao800/parse-size-with-unit'
import {
  popperGenerator,
  defaultModifiers
} from '@popperjs/core/lib/popper-lite'
import flip from '@popperjs/core/lib/modifiers/flip'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import offset from '@popperjs/core/lib/modifiers/offset'
import clickOutside from './clickOutSide'

const createPopper = popperGenerator({
  defaultModifiers: [
    ...defaultModifiers,
    flip,
    preventOverflow,
    offset,
    {
      name: 'offset',
      options: { offset: [0, 5] }
    }
  ]
})

export default {
  name: 'SelectWrapper',

  inheritAttrs: false,

  directives: {
    clickOutside
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {},
    multiple: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    dropdownWidth: { type: [Number, String] },
    dropdownZIndex: { type: Number, default: 1000 },
    appendToBody: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    limit: { type: Number, default: Infinity },
    limitText: { type: Function, default: count => `+${count}` },
    popperClass: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Loading...' },
    closeOnSelect: {}
  },

  data() {
    return {
      visible: false,
      popperWidth: null
    }
  },

  computed: {
    isEmptyValue() {
      return !hasValue(this.value)
    },
    popupComputedStyle() {
      return {
        width: this.popperWidth,
        zIndex: this.dropdownZIndex
      }
    },
    showingValue() {
      if (this.limit > 0) {
        return this.value.slice(0, this.limit)
      }
      return this.value
    },
    internalCloseOnSelect() {
      return this.closeOnSelect !== undefined
        ? this.closeOnSelect
        : !this.multiple
    }
  },

  watch: {
    visible(val) {
      this.$emit('visible-change', val)
    },
    value(val) {
      this.$emit('change', val)
      if (this.internalCloseOnSelect) {
        this.$nextTick(() => this.hideDropdown())
      }
    }
  },

  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      // eslint-disable-next-line no-console
      console.error(
        '[SelectWrapper error] Expected array with v-model/value in multiple mode, got ' +
          `${typeof this.value} with value`,
        this.value
      )
    }
  },

  mounted() {
    let popperWidth = parseSize(this.dropdownWidth)
    if (!popperWidth) {
      const triggerBounding = this.$refs.trigger.getBoundingClientRect()
      popperWidth = parseSize(triggerBounding.width)
    }
    this.popperWidth = popperWidth
    this._appendPopper()
  },

  beforeDestroy() {
    this._removePopper()
  },

  methods: {
    delValue(index) {
      if (Array.isArray(this.value)) {
        const newValue = [].concat(
          this.value.slice(0, index),
          this.value.slice(index + 1, this.value.length)
        )
        this.$emit('change', newValue)
      }
    },

    clearValue() {
      this.hideDropdown()
      this.$emit('change', this.multiple ? [] : undefined)
      this.$emit('clear')
    },

    showDropdown() {
      this.visible = true
      this.$nextTick(() => {
        this.popperIns = createPopper(
          this.$refs.trigger,
          this.$refs.popupContainer
        )
      })
    },

    hideDropdown() {
      this.visible = false
      // this.$nextTick will cause popper closing with some visual 'flashing' here
      setTimeout(() => {
        this.popperIns && this.popperIns.destroy()
      })
    },

    toggleDropdown() {
      if (this.disabled) return
      this.visible ? this.hideDropdown() : this.showDropdown()
    },

    updatePopper() {
      this.popperIns && this.popperIns.update()
    },

    _appendPopper() {
      if (this.appendToBody) {
        this.$refs.popupContainer &&
          document.body.appendChild(this.$refs.popupContainer)
      }
    },

    _removePopper() {
      if (this.appendToBody) {
        this.$refs.popupContainer &&
          document.body.removeChild(this.$refs.popupContainer)
      }
    }
  }
}
</script>
