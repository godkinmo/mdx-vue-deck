<template>
  <div class="absolute inset-0 overflow-hidden">
    <mdx-wall
      ref="wall"
      class="flex flex-row justify-start w-full h-full transition-transform transition-normal"
      :style="styleObj"
    />
  </div>
</template>

<script>
import Prism from 'prismjs'
import MdxWall from '@/mdx/wall.mdx'

export default {
  components: {
    MdxWall,
  },

  props: ['page', 'walls'],

  computed: {
    styleObj() {
      return {
        transform: `translateX(-${(
          (Math.abs(this.$store.state.currentPage-this.page) === 1
            ? this.page
            : this.$store.state.currentPage
          ) -1 )*100}%)`,
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit('setCurrentPage', this.page)
    }, 0)

    Prism.highlightAll()

    let wallPage = 1
    let newWalls = [[]]

    Array.from(this.$refs.wall.$el.children).forEach(el => {
      if (el.outerHTML === '<hr>') {
        newWalls[wallPage] = []
        wallPage++
      } else {
        newWalls[wallPage-1].push(el)
      }
    })

    this.$refs.wall.$el.innerHTML = ''

    newWalls.forEach(wall => {
      const node = document.createElement('div')
      const classList = 'markdown w-full h-full flex-shrink-0 flex flex-col items-center justify-center'
      classList.split(' ').forEach(c => node.classList.add(c))

      wall.forEach(el => node.appendChild(el))

      this.$refs.wall.$el.append(node)
    })
  },
}
</script>
