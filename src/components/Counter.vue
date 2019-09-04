<template>
  <div class="flex flex-row items-center font-mono">
    <button type="button" class="block h-16 w-16 rounded bg-gray-100 text-gray-800 flex items-center justify-center" @click="counter--">-</button>
    <span class="mx-4">{{ counter }}</span>
    <button type="button" class="block h-16 w-16 rounded bg-gray-100 text-gray-800 flex items-center justify-center" @click="counter++">+</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 0,
  }),
}
</script>
