<template>
  <div class="bg-black">
    <Deck ref="markdown" class="hidden" />

    <div>
      <ul class="h-screen overflow-auto pt-2">
        <li v-for="(deck, i) in decks" :key="i" class="px-4 mb-2">
          <div class="relative pb-7/12 border-4 cursor-pointer overflow-hidden bg-gray-900"
            :class="[ page === i+1 ? 'border-blue-500' : 'border-transparent' ]"
            @click="goPage(i+1)"
          >
            <div class="absolute markdown pointer-events-none"
              v-html="decks[i]"
              style="width: 600%; height: 600%; transform: scale(0.166667); transform-origin: 0px 0px;"
            >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      return parseInt(this.$route.params.page || 1)
    }
  },

  mounted() {
    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')
  },

  methods: {
    goPage(page) {
      this.$router.push({ name: 'home', params: { page }})
    }
  }
}
</script>
