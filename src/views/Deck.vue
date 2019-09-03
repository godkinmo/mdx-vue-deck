<template>
  <div class="h-full">
    <Deck ref="markdown" class="hidden" />
    <div class="flex items-center justify-center h-full overflow-hidden">
      <div class="markdown w-full h-full" v-html="decks[page-1]"></div>
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
    }
  },

  computed: {
    page() {
      return parseInt(this.$route.params.page) || 1
    },
  },

  mounted() {
    Prism.highlightAll()
    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')

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
