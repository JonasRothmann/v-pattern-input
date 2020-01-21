<template>
  <component
    :is="component"
    ref="input"
    v-model="val"
    v-bind="$attrs"
    v-on="listeners"
  />
</template>

<script type="text/ecmascript-6">
export default {
  name: 'VPatternInput',
  props: {
    value: {
      required: true,
      type: [Number, String]
    },
    // Using for: String.prototype.replace(regexp, replacement)
    regExp: {
      type: RegExp,
      default: null
    },
    // Using for: String.prototype.replace(regexp, replacement)
    replacement: {
      type: String,
      default: ''
    },
    component: {
      type: [String, Object],
      default: 'input'
    }
  },
  data () {
    return {
      val: ''
    }
  },
  computed: {
    listeners () {
      const listeners = {}

      Object.keys(this.$listeners).forEach(fnName => {
        listeners[fnName] = (e) => {
          this.$listeners[fnName](e.target.value)
        }
      })

      listeners.input = (e) => {
        this.updateValue(e)
      }

      return listeners
    }
  },
  watch: {
    // watch value prop
    value: {
      handler (val) {
        if (val !== this.val) {
          this.updateValue(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    // format the value of input
    formatValue (val) {
      const formattedValue = val.toString().replace(this.regExp, this.replacement)

      return formattedValue
    },

    // update the value of input
    updateValue (val) {
      const formattedValue = this.formatValue(val)

      this.val = formattedValue
      this.emitInput(formattedValue)
    },

    // emit input event
    emitInput (val) {
      if (this.$refs.input !== undefined) {
        this.$refs.input.lazyValue = val
      }
    }
  }
}
</script>

<style>
</style>
