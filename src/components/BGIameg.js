export default {
  props: ['src'],

  render(createElement) {
    return createElement('div', {
      attrs: {
        class: 'w-full',
      },
    }, [
      createElement('img', {
        attrs: {
          class: 'w-full h-full',
          src: this.src,
        }
      })
    ])
  }
}
