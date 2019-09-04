<template>
  <ul ref="decks" class="h-screen overflow-auto pt-4 bg-black">
    <li v-for="(deck, i) in decks" :key="i" class="px-4 mb-4">
      <div class="relative pb-7/12 border-4 cursor-pointer overflow-hidden bg-gray-900"
        :class="[ page === i+1 ? 'border-blue-500' : 'border-transparent' ]"
        @click="$emit('go-page', i+1)"
      >
        <div class="absolute markdown pointer-events-none"
          v-html="decks[i]"
          style="width: 600%; height: 600%; transform: scale(0.166667); transform-origin: 0px 0px;"
        >
        </div>
      </div>
    </li>
  </ul>
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
    scrollToHighlighted(index, block='nearest') {
      this.$refs.decks.children[index].scrollIntoView({
        block
      })
    },
  }
}
</script>
