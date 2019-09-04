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
    this.$store.commit('setCurrentPage', this.page)

    Prism.highlightAll()

    window.addEventListener('keydown', this.keydownHandler)

    this.$on('hook:destroyed', () => {
      window.removeEventListener('keydown', this.keydownHandler)
    })

    let deckPage = 1
    let newDecks = [[]]

    Array.from(this.$refs.deck.$el.children).forEach(el => {
      if (el.outerHTML === '<hr>') {
        newDecks[deckPage] = []
        deckPage++
      } else {
        newDecks[deckPage-1].push(el)
      }
    })

    this.$refs.deck.$el.innerHTML = ''

    newDecks.forEach(deck => {
      const node = document.createElement('div')
      const classList = 'markdown w-full h-full flex-shrink-0 flex flex-col items-center justify-center'
      classList.split(' ').forEach(c => node.classList.add(c))

      deck.forEach(el => node.appendChild(el))

      this.$refs.deck.$el.append(node)
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
