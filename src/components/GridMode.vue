<template>
  <div>
    <ul class="flex flex-wrap">
      <li v-for="(deck, i) in decks" :key="i" class="w-1/4">
        <div class="relative pb-7/12 border-2 cursor-pointer overflow-hidden bg-gray-900"
          :class="[ page === i+1 ? 'border-blue-500' : 'border-black' ]"
          @click="$emit('go-page', i+1)"
        >
          <div class="absolute markdown pointer-events-none"
            v-html="decks[i]"
            style="width: 400%; height: 400%; transform: scale(.25); transform-origin: 0px 0px;"
          >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['decks', 'page'],
}
</script>
