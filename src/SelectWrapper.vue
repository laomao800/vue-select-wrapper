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
      <div ref="trigger" class="sw__selection">
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
              v-if="collapseTags && value.length > showingValue.length"
              class="sw__tag sw__tag-collapse"
            >
              +{{ value.length - showingValue.length }}
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
    <transition name="sw__dropdown-trans">
      <div
        ref="popupContainer"
        v-show="visible"
        :style="popupComputedStyle"
        :class="['sw__dropdown', popperClass]"
        @click.stop
      >
        <div v-if="loading" class="sw__loading">{{ loadingText }}</div>
        <div v-show="!loading"><slot /></div>
      </div>
    </transition>
  </div>
</template>

<script>
import hasValue from 'has-values'
import parseSize from '@laomao800/parse-size-with-unit'
import clickOutside from './clickOutSide'
import getScrollParents from './getScrollParents'
import './style.less'

const isEmpty = val => !hasValue(val)

export default {
  name: 'SelectWrapper',

  inheritAttrs: false,

  directives: {
    clickOutside
  },

  model: {
    prop: 'value',
    event: 'value-change'
  },

  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    dropdownWidth: {
      type: [Number, String]
    },
    dropdownZIndex: {
      type: Number,
      default: 1000
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: [Number, Boolean],
      default: false
    },
    popperClass: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    closeOnSelect: {}
  },

  data() {
    return {
      visible: false,
      popupStyle: {},
      scrollParents: []
    }
  },

  computed: {
    isEmptyValue() {
      return isEmpty(this.value)
    },
    popupComputedStyle() {
      return {
        width: parseSize(this.dropdownWidth),
        zIndex: this.dropdownZIndex + 2,
        ...this.popupStyle
      }
    },
    showingValue() {
      if (this.collapseTags) {
        return this.value.slice(0, +this.collapseTags)
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
    visible: {
      immediate: true,
      handler(val) {
        this.visible = val
      }
    },
    async value(val) {
      this.$emit('change', val)
      await this.$nextTick()
      if (this.appendToBody) {
        this.updatePopper()
      }
      if (this.internalCloseOnSelect) {
        this.hideDropdown()
      }
    }
  },

  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      console.error(
        '[SelectWrapper error] Expected array with v-model/value in multiple mode, got ' +
          typeof this.value +
          ' with value ' +
          this.value.toString()
      )
    }
  },

  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$refs.popupContainer)

      // 需要获取所有滚动父级，以确保多层滚动条场景下定位准确
      this.$nextTick().then(() => {
        const loopGetScrollParent = parentEle => {
          let parent = parentEle
          if (
            parentEle === window.document.body ||
            parentEle === window.document.documentElement
          ) {
            parent = window
          } else {
            loopGetScrollParent(getScrollParents(parent))
          }
          this.scrollParents.push(parent)
        }
        loopGetScrollParent(getScrollParents(this.$refs.trigger))
        this.scrollParents.forEach(element => {
          element.addEventListener('scroll', this.updatePopper)
        })
        window.addEventListener('resize', this.updatePopper)
      })
    }
  },

  beforeDestroy() {
    this.scrollParents.forEach(element => {
      element.removeEventListener('scroll', this.updatePopper)
    })
    if (this.appendToBody) {
      const popup = this.$refs.popupContainer
      popup.parentElement.removeChild(popup)
      window.removeEventListener('resize', this.updatePopper)
    }
  },

  methods: {
    delValue(index) {
      if (Array.isArray(this.value)) {
        const newValue = [
          ...this.value.slice(0, index),
          ...this.value.slice(index + 1, this.value.length)
        ]
        this.$emit('value-change', newValue)
      }
    },

    clearValue() {
      this.hideDropdown()
      this.$emit('value-change', this.multiple ? [] : undefined)
      this.$emit('clear')
    },

    showDropdown() {
      if (!this.visible) {
        this.visible = true
        this.$emit('visible-change', this.visible)
        if (this.appendToBody) {
          this.updatePopper()
        }
      }
    },

    hideDropdown() {
      if (this.visible) {
        this.visible = false
        this.$emit('visible-change', this.visible)
      }
    },

    toggleDropdown() {
      if (this.disabled) return
      const newStatus = !this.visible
      newStatus ? this.showDropdown() : this.hideDropdown()
    },

    getPopupStyle() {
      const triggerBounding = this.$refs.trigger.getBoundingClientRect()
      const offsetLeft = triggerBounding.left + window.scrollX
      const offsetTop = triggerBounding.bottom + window.scrollY
      return {
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
        width: this.dropdownWidth
          ? `${this.dropdownWidth}px`
          : `${triggerBounding.width}px`
      }
    },

    updatePopper() {
      if (this.visible) {
        this.popupStyle = this.getPopupStyle()
      }
    }
  }
}
</script>
