module.exports = function (src) {
  src = src.replace('wrapper', 'div')
  src = src.replace('mdxType="MDXLayout"', 'class="markdown"')
  src = src.replace(/inlineCode/g, 'code')

  return src
}
