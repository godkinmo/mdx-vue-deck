<template>
  <div>
    <transition
      enter-active-class="transition-all transition-fast"
      leave-active-class="transition-all transition-fast"
      enter-class="opacity-0 scale-0"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-0"
      mode="out-in"
    >
      <router-view :key="$route.name + ($route.params.page || '')" class="origin-right">
      </router-view>
    </transition>
  </div>
</template>

<style src="./styles/main.css"></style>
