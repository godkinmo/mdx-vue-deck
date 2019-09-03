<template>
  <div class="flex items-center justify-center h-full overflow-hidden bg-gray-900">
    <mdx-deck ref="deck" class="markdown w-full h-full" />
  </div>
</template>

<script>
import Prism from 'prismjs'
import MdxDeck from '@/mdx/deck.mdx'

export default {
  components: {
    MdxDeck,
  },

  props: ['page', 'decks'],

  mounted() {
    Prism.highlightAll()

    window.addEventListener('keydown', this.keydownHandler)

    this.$on('hook:destroyed', () => {
      window.removeEventListener('keydown', this.keydownHandler)
    })

    let deckPage = 1
    Array.from(this.$refs.deck.$el.children).forEach(el => {
      if (el.outerHTML === '<hr>') {
        deckPage++
      }
      if (deckPage !== this.page) {
        el.classList.add('hidden')
      }
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
