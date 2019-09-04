<template>
  <div class="flex flex-row">
    <mdx-deck ref="markdown" class="hidden" />

    <overview-sidebar v-if="overview" :decks="decks" :page="page" class="w-1/6" @go-page="goPage" />

    <div class="flex flex-col h-screen"
      :class="[ overview ? 'w-5/6 pt-4 bg-black' : 'w-full']"
    >
      <div class="relative h-full overflow-hidden bg-gray-900">
        <transition :name="transitionName">
          <router-view :key="$route.name + ($route.params.page || '')" :page="page" :decks="decks">
          </router-view>
        </transition>
      </div>

      <div v-if="overview" class="bg-black p-4 text-right">
        {{ page }} / {{ decks.length }}
      </div>
      <div v-else class="absolute bottom-0 w-full py-4 flex justify-center">
        <button type="button" v-for="i in decks.length" :key="i" class="inline-block w-2 h-2 border-4 border-transparent p-1 rounded-full bg-white cursor-default outline-none focus:shadow-outline-sm"
          style="background-clip: padding-box;"
          :class="[
            i <= page ? 'opacity-50' : 'opacity-25',
          ]"
          @click="goPage(i)"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import MdxDeck from '@/mdx/deck.mdx'
import OverviewSidebar from '@/components/OverviewSidebar.vue'

export default {
  components: {
    MdxDeck,
    OverviewSidebar,
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
    }
  },

  computed: {
    overview() {
      return this.$store.state.overview
    },
    page() {
      return parseInt(this.$route.params.page || 1)
    },
  },

  mounted() {
    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')

    Mousetrap.bind('option+o', () => {
      this.$store.commit('toggleOverview')
    })
  },

  methods: {
    goPage(page) {
      this.$router.push({ name: 'home', params: { page }})
    },
  }
}
</script>

<style src="./styles/main.css"></style>
