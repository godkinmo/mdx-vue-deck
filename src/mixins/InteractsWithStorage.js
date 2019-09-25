const keys = {
  page: 'mdx-deck-page',
  step: 'mdx-deck-step',
}

export default {
  data: () => ({
    focused: true,
  }),

  mounted() {
    window.addEventListener('focus', this.handleFocus)
    window.addEventListener('blur', this.handleBlur)
  },

  beforeDestroy() {
    window.removeEventListener('focus', this.handleFocus)
    window.removeEventListener('blur', this.handleBlur)
  },

  watch: {
    '$store.state.currentPage'(page) {
      if (!this.focused) return
      localStorage.setItem(keys.page, page)
    },
    '$store.state.step' (step) {
      localStorage.setItem(keys.step, step)
    },
    focused: {
      immediate: true,
      handler(focused) {
        if (!focused){
          window.addEventListener('storage', this.handleStorageChange)
        } else {
          window.removeEventListener('storage', this.handleStorageChange)
        }
      }
    },
  },

  methods: {
    handleFocus() {
      this.focused = true
    },
    handleBlur() {
      this.focused = false
    },
    handleStorageChange(e) {
      const n = parseInt(e.newValue, 10)

      if (isNaN(n)) return

      switch (e.key) {
        case keys.page:
          this.$router.push({ name: 'home', params: { page: n }})
          break
        case keys.step:
          this.$store.commit('setStep', n)
          break
        default:
          break
      }
    }
  }
}
