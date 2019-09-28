export default {
  render(createElement) {
    return createElement('div', {
      attrs: {
        class: 'w-full flex flex-row -mx-2'
      }
    }, [
      createElement('div', {
        attrs: {
          class: 'w-1/2 mx-2 flex items-center justify-center'
        }
      }, [this.$slots.default[0]]),

      createElement('div', {
        attrs: {
          class: 'w-1/2 mx-2 flex flex-col items-center justify-center'
        }
      }, [
        ...this.$slots.default.slice(1)
      ])
    ])
  }
}
