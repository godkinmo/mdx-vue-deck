<template>
  <div class="bg-black">
    <ul ref="decks" class="h-screen overflow-auto pt-2">
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
</template>

<script>

export default {
  props: ['decks', 'page'],

  watch: {
    page(val) {
      this.scrollToHighlighted(val-1)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.scrollToHighlighted(this.page-1, 'end')
    })
  },

  methods: {
    goPage(page) {
      this.$router.push({ name: 'home', params: { page }})
    },

    scrollToHighlighted(index, block='nearest') {
      this.$refs.decks.children[index].scrollIntoView({
        block
      })
    },
  }
}
</script>
