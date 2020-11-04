/**
 * @preserve
 * @laomao800/vue-select-wrapper v1.3.1
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hasValue = _interopDefault(require('has-values'));
var parseSize = _interopDefault(require('@laomao800/parse-size-with-unit'));
var popperLite = require('@popperjs/core/lib/popper-lite');
var flip = _interopDefault(require('@popperjs/core/lib/modifiers/flip'));
var preventOverflow = _interopDefault(require('@popperjs/core/lib/modifiers/preventOverflow'));
var offset = _interopDefault(require('@popperjs/core/lib/modifiers/offset'));

/**
 * Fork from: https://github.com/vue-bulma/click-outside
 */
function validate(binding) {
  if (typeof binding.value !== 'function') {
    // eslint-disable-next-line no-console
    console.warn(
      '[Vue-click-outside:] provided expression',
      binding.expression,
      'is not a function.'
    );
    return false
  }

  return true
}

function isPopup(popupItem, elements) {
  if (!popupItem || !elements) {
    return false
  }

  for (var i = 0, list = elements; i < list.length; i += 1) {
    var element = list[i];

    try {
      if (popupItem.contains(element)) {
        return true
      }
      if (element.contains(popupItem)) {
        return false
      }
    } catch (e) {
      return false
    }
  }

  return false
}

function isServer(vNode) {
  return (
    typeof vNode.componentInstance !== 'undefined' &&
    vNode.componentInstance.$isServer
  )
}

var directive = {
  bind: function bind(el, binding, vNode) {
    if (!validate(binding)) { return }

    // Define Handler and cache it on the element
    function handler(e) {
      if (!vNode.context) { return }

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      var elements = e.path || (e.composedPath && e.composedPath());
      elements && elements.length > 0 && elements.unshift(e.target);

      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) {
        return
      }

      el.__vueClickOutside__.callback(e);
    }

    // add Event Listeners
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    };
    !isServer(vNode) && document.addEventListener('click', handler);
  },

  update: function update(el, binding) {
    if (validate(binding)) { el.__vueClickOutside__.callback = binding.value; }
  },

  unbind: function unbind(el, binding, vNode) {
    // Remove Event Listeners
    !isServer(vNode) &&
      document.removeEventListener('click', el.__vueClickOutside__.handler);
    delete el.__vueClickOutside__;
  }
};

//

var createPopper = popperLite.popperGenerator({
  defaultModifiers: popperLite.defaultModifiers.concat( [flip],
    [preventOverflow],
    [offset],
    [{
      name: 'offset',
      options: { offset: [0, 5] }
    }]
  )
});

var script = {
  name: 'SelectWrapper',

  inheritAttrs: false,

  directives: {
    clickOutside: directive
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
    limitText: { type: Function, default: function (count) { return ("+" + count); } },
    popperClass: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Loading...' },
    closeOnSelect: {}
  },

  data: function data() {
    return {
      visible: false,
      popperWidth: null
    }
  },

  computed: {
    isEmptyValue: function isEmptyValue() {
      return !hasValue(this.value)
    },
    popupComputedStyle: function popupComputedStyle() {
      return {
        width: this.popperWidth,
        zIndex: this.dropdownZIndex
      }
    },
    showingValue: function showingValue() {
      if (this.limit > 0) {
        return this.value.slice(0, this.limit)
      }
      return this.value
    },
    internalCloseOnSelect: function internalCloseOnSelect() {
      return this.closeOnSelect !== undefined
        ? this.closeOnSelect
        : !this.multiple
    }
  },

  watch: {
    visible: function visible(val) {
      this.$emit('visible-change', val);
    },
    value: function value(val) {
      var this$1 = this;

      this.$emit('change', val);
      if (this.internalCloseOnSelect) {
        this.$nextTick(function () { return this$1.hideDropdown(); });
      }
    }
  },

  created: function created() {
    if (this.multiple && !Array.isArray(this.value)) {
      // eslint-disable-next-line no-console
      console.error(
        '[SelectWrapper error] Expected array with v-model/value in multiple mode, got ' +
          (typeof this.value) + " with value",
        this.value
      );
    }
  },

  mounted: function mounted() {
    var popperWidth = parseSize(this.dropdownWidth);
    if (!popperWidth) {
      var triggerBounding = this.$refs.trigger.getBoundingClientRect();
      popperWidth = parseSize(triggerBounding.width);
    }
    this.popperWidth = popperWidth;
    this._appendPopper();
  },

  beforeDestroy: function beforeDestroy() {
    this._removePopper();
  },

  methods: {
    delValue: function delValue(index) {
      if (Array.isArray(this.value)) {
        var newValue = [].concat(
          this.value.slice(0, index),
          this.value.slice(index + 1, this.value.length)
        );
        this.$emit('change', newValue);
      }
    },

    clearValue: function clearValue() {
      this.hideDropdown();
      this.$emit('change', this.multiple ? [] : undefined);
      this.$emit('clear');
    },

    showDropdown: function showDropdown() {
      var this$1 = this;

      this.visible = true;
      this.$nextTick(function () {
        this$1.popperIns = createPopper(
          this$1.$refs.trigger,
          this$1.$refs.popupContainer
        );
      });
    },

    hideDropdown: function hideDropdown() {
      var this$1 = this;

      this.visible = false;
      // this.$nextTick will cause popper closing with some visual 'flashing' here
      setTimeout(function () {
        this$1.popperIns && this$1.popperIns.destroy();
      });
    },

    toggleDropdown: function toggleDropdown() {
      if (this.disabled) { return }
      this.visible ? this.hideDropdown() : this.showDropdown();
    },

    updatePopper: function updatePopper() {
      this.popperIns && this.popperIns.update();
    },

    _appendPopper: function _appendPopper() {
      if (this.appendToBody) {
        this.$refs.popupContainer &&
          document.body.appendChild(this.$refs.popupContainer);
      }
    },

    _removePopper: function _removePopper() {
      if (this.appendToBody) {
        this.$refs.popupContainer &&
          document.body.removeChild(this.$refs.popupContainer);
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.hideDropdown),expression:"hideDropdown"}],class:( _obj = {
    sw__wrapper: true,
    'sw__wrapper--active': _vm.visible,
    'sw__wrapper--disabled': _vm.disabled
  }, _obj[("sw__wrapper--" + _vm.size)] = _vm.size, _obj )},[_c('div',{ref:"trigger",staticClass:"sw__trigger",on:{"click":_vm.toggleDropdown}},[_c('div',{staticClass:"sw__selection"},[(_vm.isEmptyValue)?_c('div',{staticClass:"sw__placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):[(_vm.multiple)?_c('div',{staticClass:"sw__multiple"},[_vm._l((_vm.showingValue),function(row,index){return _c('div',{key:index,staticClass:"sw__tag"},[_c('span',{staticClass:"sw__tag-text"},[_vm._t("value-template",[_vm._v(_vm._s(row))],{"value":row})],2),_vm._v(" "),(!_vm.disabled)?_c('span',{staticClass:"sw__tag-del",on:{"click":function($event){$event.stopPropagation();return _vm.delValue(index)}}},[_c('i',{staticClass:"sw__icon-close"})]):_vm._e()])}),_vm._v(" "),(_vm.limit && _vm.value.length > _vm.limit)?_c('div',{staticClass:"sw__tag sw__tag-limit"},[_vm._v("\n            "+_vm._s(_vm.limitText(_vm.value.length - _vm.limit))+"\n          ")]):_vm._e()],2):_c('div',{staticClass:"sw__single"},[_c('div',{staticClass:"sw__tag-text"},[_vm._t("value-template",[_vm._v(_vm._s(_vm.value))],{"value":_vm.value})],2)])]],2),_vm._v(" "),(!_vm.disabled)?_c('div',{staticClass:"sw__suffix"},[_c('i',{staticClass:"sw__icon-arrow-down"}),_vm._v(" "),(_vm.clearable && !_vm.isEmptyValue)?_c('span',{staticClass:"sw__clear",on:{"click":function($event){$event.stopPropagation();return _vm.clearValue($event)}}},[_c('i',{staticClass:"sw__icon-close"})]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"popupContainer",class:['sw__dropdown', _vm.popperClass],style:(_vm.popupComputedStyle),on:{"click":function($event){$event.stopPropagation();}}},[(_vm.loading)?_c('div',{staticClass:"sw__loading"},[_vm._v(_vm._s(_vm.loadingText))]):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.loading),expression:"!loading"}]},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-4a13df17_0", { source: ".sw__wrapper{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box}.sw__trigger{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;-webkit-transition:border .2s;transition:border .2s;cursor:pointer}.sw__trigger:hover{border-color:#c0c4cc}.sw__selection{padding:7px 0 7px 8px;min-height:24px;line-height:24px;font-size:14px}.sw__placeholder{color:#999;padding-left:.4em;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.sw__selection{-webkit-box-flex:1;-ms-flex:1;flex:1}.sw__suffix{width:30px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.sw__clear{background-color:#fff;position:absolute;display:none;line-height:0}.sw__wrapper:hover .sw__clear{display:block}.sw__multiple{line-height:1;margin-top:-4px}.sw__tag{position:relative;margin:4px 4px 0 0;background-color:#f0f2f5;border-radius:4px;color:#999;font-size:14px;height:24px;line-height:24px;padding:0 8px;display:inline-block;white-space:nowrap;max-width:calc(100% - 34px);vertical-align:top;cursor:default}.sw__tag-text{display:inline-block;vertical-align:top;text-overflow:ellipsis;overflow:hidden}.sw__tag-del{display:inline-block;vertical-align:top;padding-left:4px}.sw__tag-del .sw__icon-close{vertical-align:middle;background-color:#999;border-color:#f0f2f5;-webkit-transform:translateY(-1px);transform:translateY(-1px)}.sw__tag-del .sw__icon-close::after,.sw__tag-del .sw__icon-close::before{background-color:#fff}.sw__tag-limit{font-size:12px}.sw__single{color:#333;padding-left:6px}.sw__single__option-text{text-overflow:ellipsis;overflow:hidden}.sw__icon-arrow-down{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);margin-top:-4px;display:inline-block;width:7px;height:7px;border:solid silver;border-width:0 0 1px 1px;-webkit-transition:all .3s;transition:all .3s}.sw__icon-close{position:relative;display:inline-block;cursor:pointer;border:1px solid #999;width:12px;height:12px;border-radius:12px;opacity:.6}.sw__icon-close:hover{opacity:1}.sw__icon-close::after,.sw__icon-close::before{content:'';position:absolute;width:8px;height:1px;background-color:#999;left:50%;top:50%;margin-left:-4px}.sw__icon-close::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.sw__icon-close::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.sw__wrapper--mini .sw__selection{min-height:20px;line-height:20px;font-size:12px}.sw__wrapper--mini .sw__multiple{margin-top:-2px}.sw__wrapper--mini .sw__tag{margin-top:2px;height:20px;line-height:20px;font-size:12px}.sw__wrapper--mini .sw__selection{padding-top:3px;padding-bottom:3px;padding-left:3px}.sw__wrapper--small .sw__selection{min-height:20px;line-height:20px;font-size:12px}.sw__wrapper--small .sw__multiple{margin-top:-4px}.sw__wrapper--small .sw__tag{margin-top:4px;height:20px;line-height:20px;font-size:12px}.sw__wrapper--small .sw__selection{padding-top:5px;padding-bottom:5px;padding-left:5px}.sw__wrapper--medium .sw__selection{padding-top:5px;padding-bottom:5px;padding-left:5px}.sw__wrapper--active .sw__icon-arrow-down{-webkit-transform:rotate(135deg);transform:rotate(135deg);margin-top:4px}.sw__wrapper--disabled .sw__trigger{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.sw__wrapper--disabled .sw__trigger:hover{border-color:#e4e7ed}.sw__wrapper--disabled .sw__multiple .sw__tag{padding:0 8px;background-color:#f0f2f5;color:#909399}.sw__loading{padding:10px;font-size:14px;color:#999;text-align:center}.sw__dropdown{overflow:hidden;border:1px solid #e4e7ed;border-radius:4px;background-color:#fff;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-shadow:0 2px 12px 0 rgba(0,0,0,.1);-webkit-box-sizing:border-box;box-sizing:border-box}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var SelectWrapper = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

SelectWrapper.install = function(Vue) {
  Vue.component(SelectWrapper.name, SelectWrapper);
};

if (typeof window !== 'undefined' && window.Vue) {
  SelectWrapper.install(window.Vue);
}

module.exports = SelectWrapper;
