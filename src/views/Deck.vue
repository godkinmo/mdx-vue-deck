<template>
  <div class="h-full">
    <div class="flex items-center justify-center h-full overflow-hidden">
      <div class="markdown w-full h-full" v-html="decks[page-1]"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['decks', 'page'],

  mounted() {
    window.addEventListener('keydown', this.keydownHandler)

    this.$on('hook:destroyed', () => {
      window.removeEventListener('keydown', this.keydownHandler)
    })
  },

  methods: {
    keydownHandler(e) {
      if (e.key === 'ArrowRight') {
        if (this.page < this.decks.length) {
          this.$router.push({ name: 'home', params: { page: this.page+1}})
        }
      } else if (e.key === 'ArrowLeft') {
        if (this.page > 1) {
          this.$router.push({ name: 'home', params: { page: this.page-1}})
        }
      }
    },
  }
}
</script>
