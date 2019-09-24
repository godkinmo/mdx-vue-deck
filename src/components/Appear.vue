<template>
  <div>
    <slot />
  </div>
</template>

<script>
import InteractsWithSteps from '@/mixins/InteractsWithSteps.js'

export default {
  mixins: [ InteractsWithSteps ],

  data() {
    return {
      steps: this.$slots.default.length,
    }
  },

  mounted() {
    this.$nextTick(() => {
      Array.from(this.$el.children).forEach((el, i) => {
        if (i+1 > this.step) {
          el.classList.add('opacity-0')
        }
      })
    })
  },

  watch: {
    step(step) {
      Array.from(this.$el.children).forEach((el, i) => {
        if (i+1 <= step) {
          el.classList.remove('opacity-0')
        } else {
          el.classList.add('opacity-0')
        }
      })
    }
  },
}
</script>
