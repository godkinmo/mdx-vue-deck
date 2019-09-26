<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <h1 v-if="title" v-text="title" class="text-gray-400 font-bold mt-8 mb-4"></h1>
    <div class="flex-grow flex items-center overflow-hidden">
      <pre ref="code" v-html="html" :class="`language-${lang}`">
      </pre>
    </div>
    <p class="h-16 mt-4 mb-10">
      {{ notes }}
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
      lang: this.$attrs.lang || 'javascript',
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

  computed: {
    notes() {
      if (!this.codeSteps[this.step]) {
        return ''
      }
      return this.codeSteps[this.step].notes
    }
  },

  methods: {
    goStep(step) {
      if (!this.codeSteps[step]) {
        return
      }
      const { lines, range, ranges } = this.codeSteps[step]

      // Returns a highlighted HTML string
      this.html = ''

      const code = this.code.default || this.code

      code.trim().split("\n").forEach((line, i) => {
        let show = false

        const lineNumber = i+1

        if (!lines && !range && !ranges) {
          show = true
        } else {
          if (lines && lines.includes(lineNumber)) {
            show = true
          }
          if (range && range.length === 2) {
            if (lineNumber >=range[0] && lineNumber <= range[1]) {
              show = true
            }
          }
          if (ranges) {
            ranges.forEach(deepRange => {
              if (deepRange && deepRange.length === 2) {
                if (lineNumber >=deepRange[0] && lineNumber <= deepRange[1]) {
                  show = true
                }
              }
            })
          }
        }

        const className = `token-line ${show ? '' : 'opacity-25'} transition-normal`

        const lineText = line ? Prism.highlight(line, Prism.languages[this.lang], this.lang) : '<span class="inline-block"></span>'
        this.html += `<div class="${className}">${lineText}</div>`
      })
    }
  }
}
</script>
