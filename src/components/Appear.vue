<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  data: () => ({
    componentPage: null,
  }),

  mounted() {
    this.$nextTick(() => {
      const deckEl = this.$el.parentNode
      this.componentPage = Array.from(this.$parent.$el.children).indexOf(deckEl) + 1

      Array.from(this.$el.children).forEach((el, i) => {
        if (i+1 > this.step) {
          el.classList.add('opacity-0')
        }
      })
    })
  },

  beforeDestroy() {
    this.$store.commit('setSteps', 0)
  },

  watch: {
    active(value) {
      if (value) {
        this.$store.commit('setSteps', this.$slots.default.length)
      }
    },
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

  computed: {
    mode() {
      return this.$store.state.mode
    },
    currentPage() {
      return this.$route.params.page
    },
    active() {
      return parseInt(this.currentPage) === parseInt(this.componentPage)
    },
    steps() {
      return this.$store.state.steps
    },
    step() {
      return this.$store.state.step || 0
    }
  },
}
</script>
