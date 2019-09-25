export default {
  data: () => ({
    componentPage: null,
  }),

  mounted() {
    this.$nextTick(() => {
      const deckEl = this.$el.closest('.markdown')
      if (deckEl) {
        this.componentPage = Array.from(deckEl.parentElement.children).indexOf(deckEl) + 1
      }
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
    step(step) {
      if (this.active) {
        history.pushState({}, '', `/#/${this.currentPage}${step ? `.${step}`: ''}`);
      }
    },
  },

  computed: {
    currentPage() {
      return parseInt(this.$route.params.page)
    },
    active() {
      return this.currentPage === this.componentPage
    },
    step() {
      return this.$store.state.step || 0
    }
  },
}
