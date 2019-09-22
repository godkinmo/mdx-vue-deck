<template>
  <div class="flex flex-col">
    <div class="flex-auto flex flex-row p-8">
      <div class="flex flex-col h-full w-3/4 mr-8">
        <slot />
      </div>
      <div class="w-1/4">
        <div v-if="page < decks.length" class="relative overflow-hidden" style="padding-bottom: 56.25%">
          <div class="absolute markdown pointer-events-none"
            v-html="decks[page]"
            style="width: 400%; height: 400%; transform: scale(.25); transform-origin: 0px 0px;"
          >
          </div>
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 h-24 p-8 text-white font-bold font-mono tracking-widest">
      {{ page }}/{{ decks.length }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['decks', 'page'],
}
</script>
