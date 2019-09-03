<template>
  <div class="flex flex-row">
    <Deck ref="markdown" class="hidden" />

    <overview-sidebar v-if="overview" :decks="decks" :page="page" class="w-1/6" />

    <div class="flex flex-col h-screen overflow-hidden"
      :class="[ overview ? 'w-5/6' : 'w-full']"
    >
      <transition :name="transitionName" mode="out-in">
        <router-view
          :decks="decks"
          :page="page"
          :key="$route.name + ($route.params.page || '')"
        >
        </router-view>
      </transition>

      <div v-if="overview" class="bg-black p-4">
        {{ page }} / {{ decks.length }}
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import Mousetrap from 'mousetrap'
import Deck from '@/mdx/deck.mdx'
import OverviewSidebar from '@/components/OverviewSidebar.vue'

export default {
  components: {
    Deck,
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
    Prism.highlightAll()

    this.decks = this.$refs.markdown.$el.innerHTML.split('<hr>')

    Mousetrap.bind('option+o', () => {
      this.$store.commit('toggleOverview')
    })
  },
}
</script>

<style src="./styles/main.css"></style>
