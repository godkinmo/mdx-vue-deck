<template>
  <div>
    <pre ref="code" v-html="html" class="language-javascript">
    </pre>
  </div>
</template>

<script>
import Prism from 'prismjs'
import InteractsWithSteps from '@/mixins/InteractsWithSteps.js'

export default {
  mixins: [ InteractsWithSteps ],

  data() {
    return {
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
        const className = `token-line ${lines.includes(i+1) ? '' : 'opacity-25'} transition-normal`
        this.html += `<div class="${className}">${Prism.highlight(line, Prism.languages[this.lang], this.lang)}</div>`
      })
    }
  }
}
</script>

<style>
  .token-line {
      height: 1.5rem;
  }
</style>
