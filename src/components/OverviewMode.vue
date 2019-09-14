<template>
  <div class="flex flex-row">
    <ul ref="walls" class="h-screen w-1/6 overflow-auto pt-4">
      <li v-for="(wall, i) in walls" :key="i" class="px-4 mb-4">
        <div class="relative border-4 cursor-pointer overflow-hidden bg-gray-900"
          :class="[ page === i+1 ? 'border-blue-500' : 'border-transparent' ]"
          style="padding-bottom: 56.25%"
          @click="$emit('go-page', i+1)"
        >
          <div class="absolute markdown pointer-events-none"
            v-html="walls[i]"
            style="width: 600%; height: 600%; transform: scale(0.166667); transform-origin: 0px 0px;"
          >
          </div>
        </div>
      </li>
    </ul>

    <div class="flex flex-col h-screen w-5/6 pt-4">
      <slot />

      <div class="p-4 text-right">
        {{ page }} / {{ walls.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['walls', 'page'],

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
      this.$refs.walls.children[index].scrollIntoView({
        block
      })
    },
  },
}
</script>
