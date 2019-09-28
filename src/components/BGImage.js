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
          class: 'mx-auto h-full',
          src: this.src,
        }
      })
    ])
  }
}
