<template>
  <div class="h-screen">
    <mdx-deck ref="markdown" class="hidden" />

    <component
      :is="modeComponent"
      :decks="decks"
      :page="page"
      @go-page="goPage"
      class="h-full"
    >
      <div class="relative h-full overflow-hidden bg-gray-900">
        <transition :name="transitionName">
          <router-view :key="$route.name + ($route.params.page || '')" :page="page" :decks="decks">
          </router-view>
        </transition>

        <div v-if="mode==='normal'" class="fixed bottom-0 inset-x-0 mb-2 flex justify-center">
          <button type="button" v-for="i in decks.length" :key="i" class="inline-block w-2 h-2 border-4 border-transparent p-1 rounded-full bg-green-500 cursor-default outline-none focus:shadow-outline-sm"
            style="background-clip: padding-box;"
            :class="[
              i <= page ? 'opacity-50' : 'opacity-25',
            ]"
            @click="goPage(i)"
          >
          </button>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import MdxDeck from '@/mdx/deck.mdx'

import OverviewMode from '@/components/OverviewMode.vue'
import GridMode from '@/components/GridMode.vue'

export default {
  components: {
    MdxDeck,
    OverviewMode,
    GridMode,
  },

  data: () => ({
    transitionName: 'slide-left',
    decks: [],
  }),

  watch: {
    '$route' (to, from) {
      const toPage = parseInt(to.params.page)
      const fromPage = parseInt(from.params.page)
      this.transitionName = toPage < fromPage ? 'slide-right' : 'slide-left'
    },
  },

  computed: {
    mode() {
      return this.$store.state.mode
    },
    modeComponent() {
      console.log(this.mode)
      return {
        normal: 'div',
        overview: 'overview-mode',
        grid: 'grid-mode',
      }[this.mode]
    },
    page() {
      return parseInt(this.$route.params.page || 1)
    },
  },

  mounted() {
    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')

    Mousetrap.bind('option+o', () => {
      this.$store.commit('toggleMode', 'overview')
    })
    Mousetrap.bind('option+g', () => {
      this.$store.commit('toggleMode', 'grid')
    })

    window.addEventListener('keydown', this.keydownHandler)

    this.$on('hook:destroyed', () => {
      window.removeEventListener('keydown', this.keydownHandler)
    })
  },

  methods: {
    goPage(page) {
      if (this.mode === 'grid') {
        this.$store.commit('toggleMode', 'normal')
      }
      this.$router.push({ name: 'home', params: { page }})
    },
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
  },
}
</script>

<style src="./styles/main.css"></style>
