<template>
  <div class="flex flex-row">
    <overview-sidebar v-if="overview" class="w-1/6" />

    <div class="flex flex-col h-screen overflow-hidden"
      :class="[ overview ? 'w-5/6' : 'w-full']"
    >
      <transition :name="transitionName" mode="out-in">
        <router-view
          :key="$route.name + ($route.params.page || '')"
        >
        </router-view>
      </transition>

      <div class="p-4 bg-black">
        3 / 19
      </div>
    </div>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import OverviewSidebar from '@/components/OverviewSidebar.vue'

export default {
  components: {
    OverviewSidebar,
  },

  data: () => ({
    transitionName: 'slide-left'
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
  },

  mounted() {
    Mousetrap.bind('option+o', () => {
      this.$store.commit('toggleOverview')
    })
  },
}
</script>

<style src="./styles/main.css"></style>
