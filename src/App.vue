<template>
  <div>
    <transition :name="transitionName" mode="out-in">
      <router-view :key="$route.name + ($route.params.page || '')">
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    transitionName: 'slide-left'
  }),

  watch: {
    '$route' (to, from) {
      const toPage = parseInt(to.params.page)
      const fromPage = parseInt(from.params.page)
      this.transitionName = toPage < fromPage ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style src="./styles/main.css"></style>
