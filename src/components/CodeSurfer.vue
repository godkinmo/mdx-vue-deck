<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <h1 v-if="title" v-text="title" class="text-gray-400 font-bold py-8"></h1>
    <div class="flex-grow flex items-center">
      <pre ref="code" v-html="html" :class="`language-${lang}`">
      </pre>
    </div>
    <p class="h-16 mb-16">
      {{ codeSteps[step].notes }}
    </p>
  </div>
</template>

<script>
import Prism from 'prismjs'
import InteractsWithSteps from '@/mixins/InteractsWithSteps.js'

export default {
  mixins: [ InteractsWithSteps ],

  data() {
    return {
      title: this.$attrs.title,
      lang: this.$attrs.lang,
      code: this.$attrs.code,
      codeSteps: this.$attrs.steps,
      steps: this.$attrs.steps.length - 1,
      html: '',
    }
  },

  watch: {
    step: {
      immediate: true,
      handler(step) {
        this.goStep(step)
      }
    }
  },

  methods: {
    goStep(step) {
      const { lines } = this.codeSteps[step]

      // Returns a highlighted HTML string
      this.html = ''

      this.code.trim().split("\n").forEach((line, i) => {
        const className = `token-line ${!lines || lines.includes(i+1) ? '' : 'opacity-25'} transition-normal`
        const lineText = line ? Prism.highlight(line, Prism.languages[this.lang], this.lang) : '<span class="inline-block"></span>'
        this.html += `<div class="${className}">${lineText}</div>`
      })
    }
  }
}
</script>
