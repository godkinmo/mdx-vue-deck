export default {
  data: () => ({
    componentPage: null,
  }),

  mounted() {
    this.$nextTick(() => {
      const deckEl = this.$el.parentNode
      this.componentPage = Array.from(this.$parent.$el.children).indexOf(deckEl) + 1
    })
  },

  beforeDestroy() {
    this.$store.commit('setSteps', 0)
  },

  watch: {
    active(value) {
      if (value) {
        this.$store.commit('setSteps', this.steps)
      }
    },
  },

  computed: {
    currentPage() {
      return this.$route.params.page
    },
    active() {
      return parseInt(this.currentPage) === parseInt(this.componentPage)
    },
    step() {
      return this.$store.state.step || 0
    }
  },
}
