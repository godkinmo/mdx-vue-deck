<template>
  <div class="relative h-screen flex flex-col items-center justify-center p-4">
    <Deck ref="markdown" class="hidden" />
    <div class="w-full max-w-3xl mx-auto">
      <div class="markdown" v-html="decks[page-1]"></div>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import Deck from '@/mdx/deck.mdx'

export default {
  components: {
    Deck,
  },

  data() {
    return {
      decks: [],
      page: this.$route.params.page || 1,
    }
  },

  mounted() {
    Prism.highlightAll()
    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')

    window.addEventListener('keydown', this.keydownHandler)

    this.$on('hook:destroyed', () => {
      window.removeEventListener('keydown', this.keydownHandler)
    })
  },

  watch: {
    page() {
      this.$router.push({ name: 'home', params: { page: this.page}})
        .catch(() => {})
    }
  },

  methods: {
    keydownHandler(e) {
      if (e.key === 'ArrowRight') {
        if (this.page < this.decks.length) {
          this.page++
        }
      } else if (e.key === 'ArrowLeft') {
        if (this.page > 1) {
          this.page--
        }
      }
    },
  }
}
</script>
