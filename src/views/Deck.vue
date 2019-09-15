<template>
  <div class="absolute inset-0 overflow-hidden">
    <mdx-deck
      ref="deck"
      class="flex flex-row justify-start w-full h-full transition-transform transition-normal"
      :style="styleObj"
    />
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

  computed: {
    styleObj() {
      return {
        transform: `translateX(-${(
          (Math.abs(this.$store.state.currentPage-this.page) === 1
            ? this.page
            : this.$store.state.currentPage
          ) -1 )*100}%)`,
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit('setCurrentPage', this.page)
    }, 0)

    Prism.highlightAll()

    let deckPage = 1
    let newDecks = [[]]

    Array.from(this.$refs.deck.$el.children).forEach(el => {
      if (el.outerHTML !== '<hr>') {
        newDecks[deckPage-1].push(el)
      } else {
        newDecks[deckPage] = []
        deckPage++
      }
    })

    this.$refs.deck.$el.innerHTML = ''

    newDecks.forEach(deck => {
      const node = document.createElement('div')
      const classList = 'markdown w-full h-full flex-shrink-0 flex flex-col items-center justify-center overflow-hidden'
      classList.split(' ').forEach(c => node.classList.add(c))

      deck.forEach(el => node.appendChild(el))

      this.$refs.deck.$el.append(node)
    })
  },
}
</script>
