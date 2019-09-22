const md = require('markdown-it')()
const prettifyXml = require('prettify-xml')

const getChildrenTextContent = function (children, tag = 'div', classAttr) {
  return children.map(function (node) {
     return node.children
      ? getChildrenTextContent(node.children, node.tag, node.data ? node.data.class : '')
      : `<${tag} class="${classAttr}">${node.text}</${tag}>`
  }).join('')
}

const getCodeEl = (createElement, slots, { lineNumbers }) => {
  if (slots.default[1]) {
    const codeLanguageClass = slots.default[1].children[0].data.className

    return createElement('div', {
      attrs: { class: `${codeLanguageClass}` }
    }, [slots.default[1]])
  } else {
    const prettyHTML = prettifyXml(getChildrenTextContent(slots.default), {
      indent: 4, newline: '\n    '
    })
    const codeHTML = md.render(`
    ${prettyHTML}
    `)
    return createElement('div', {
      attrs: { class: `language-html ${lineNumbers ? 'line-numbers' : ''}` },
      domProps: {
        innerHTML: codeHTML
      },
    })
  }
}

export default {
  render(createElement) {
    return createElement('div', {
      attrs: {
        class: 'relative w-full max-w-3xl overflow-hidden mb-8'
      }
    }, [
      createElement('div', {
        attrs: {
          class: 'bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4'
        }
      }, [this.$slots.default[0]]),
      createElement('div', {
        attrs: {
          class: 'rounded-b-lg bg-gray-800'
        }
      }, [
        getCodeEl(createElement, this.$slots, {
          lineNumbers: this.$attrs.lineNumbers || false
        })
      ]),
    ])
  }
}
