<template>
  <div class="flex flex-col">
    <div class="flex-auto flex flex-row p-8">
      <div class="flex flex-col h-full w-3/4 mr-8">
        <slot />
      </div>
      <div class="w-1/4">
        <div class="relative pb-7/12 overflow-hidden bg-gray-900">
          <div class="absolute markdown pointer-events-none"
            v-html="walls[page]"
            style="width: 400%; height: 400%; transform: scale(.25); transform-origin: 0px 0px;"
          >
          </div>
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 h-24 p-8 font-mono tracking-widest">
      {{ page }}/{{ walls.length }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['walls', 'page'],
}
</script>
