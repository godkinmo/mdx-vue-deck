<template>
  <div class="antialiased bg-black h-screen">
    <mdx-deck ref="markdown" class="hidden" />

    <component
      :is="modeComponent"
      :decks="decks"
      :page="page"
      @go-page="goPage"
      class="h-full"
    >
      <div class="relative h-full overflow-hidden bg-theme-background">
        <transition :name="transitionName">
          <router-view :key="$route.name + ($route.params.page || '')" :page="page" :decks="decks">
          </router-view>
        </transition>

        <div v-if="mode==='normal'">
          <div class="fixed bottom-0 inset-x-0 mb-2 flex justify-center">
            <button v-for="i in decks.length" :key="i"
              type="button"
              class="block p-1 border-2 border-transparent focus:border-theme-dot rounded-full cursor-default focus:outline-none"
              :class="[i <= page ? 'opacity-50' : 'opacity-25']"
              @click="goPage(i)"
            >
              <span class="block w-2 h-2 bg-theme-dot rounded-full"></span>
            </button>

            <div role="button" class="fixed w-16 h-full top-0 left-0" title="Previous Slide" @click="previous"></div>
            <div role="button" class="fixed w-16 h-full top-0 right-0" title="Next Slide" @click="next"></div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import MdxDeck from '@deck'

import PresenterMode from '@/components/Modes/PresenterMode.vue'
import OverviewMode from '@/components/Modes/OverviewMode.vue'
import GridMode from '@/components/Modes/GridMode.vue'

import InteractsWithStorage from '@/mixins/InteractsWithStorage.js'

export default {
  mixins: [
    InteractsWithStorage,
  ],

  components: {
    MdxDeck,
    PresenterMode,
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
    steps() {
      return this.$store.state.steps
    },
    step() {
      return this.$store.state.step || 0
    },
    modeComponent() {
      return {
        normal: 'div',
        presenter: 'presenter-mode',
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

    this.$store.commit('setStep', parseInt(location.hash.split('.')[1] || 0))

    Mousetrap.bind('option+p', () => this.$store.commit('toggleMode', 'presenter'))
    Mousetrap.bind('option+o', () => this.$store.commit('toggleMode', 'overview'))
    Mousetrap.bind('option+g', () => this.$store.commit('toggleMode', 'grid'))
    Mousetrap.bind(['right', 'pagedown', 'space'], () => this.next())
    Mousetrap.bind(['left', 'pageup', 'shift+space'], () => this.previous())
    Mousetrap.bind('esc', () => this.$store.commit('toggleMode', 'normal'))
  },

  methods: {
    goPage(page) {
      if (this.mode === 'grid') {
        this.$store.commit('toggleMode', 'normal')
      }
      if (this.page === page) return
      this.$router.push({ name: 'home', params: { page }})
      this.$store.commit('setStep', 0)
    },
    next() {
      if (this.steps > 0 && this.step < this.steps) {
        return this.$store.commit('increaseStep')
      }
      this.nextSlide()
    },
    nextSlide() {
      if (this.page >= this.decks.length) return
      this.$router.push({ name: 'home', params: { page: this.page + 1 } })
      this.$store.commit('setStep', 0)
    },
    previous() {
      if (this.steps && this.step > 0) {
        return this.$store.commit('decreaseStep')
      }
      this.previousSlide()
    },
    previousSlide() {
      if (this.page <= 1) return
      this.$router.push({ name: 'home', params: { page: this.page - 1 } })

      setTimeout(() => {
        this.$store.commit('setStep', this.steps)
      }, 0)
    }
  },
}
</script>

<style src="./styles/main.css"></style>
