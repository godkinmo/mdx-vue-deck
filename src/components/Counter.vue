<template>
  <div class="flex flex-row items-center">
    <button type="button" class="block h-12 w-12 rounded bg-gray-100 text-gray-800 flex items-center justify-center" @click="plus">&#8722;</button>
    <span class="mx-4">{{ counter }}</span>
    <button type="button" class="block h-12 w-12 rounded bg-gray-100 text-gray-800 flex items-center justify-center" @click="counter++">&#43;</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 15,
  }),
  methods: {
    plus() {
      console.log('plus')
      this.counter++
    }
  },

  mounted() {
    console.log('hi')
    this.counter = 12
    console.log(this.counter)
  }
}
</script>
