const keys = {
  page: 'mdx-deck-page',
}

export default {
  data: () => ({
    focused: false,
  }),

  mounted() {
    window.addEventListener('storage', this.handleStorageChange)
    window.addEventListener('focus', this.handleFocus)
    window.addEventListener('blur', this.handleBlur)
  },

  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange)
    window.removeEventListener('focus', this.handleFocus)
    window.removeEventListener('blur', this.handleBlur)
  },

  watch: {
    '$store.state.currentPage'(page) {
      if (!this.focused) return
      localStorage.setItem(keys.page, page)
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
        default:
          break
      }
    }
  }
}
