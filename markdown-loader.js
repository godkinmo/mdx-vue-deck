const _ = require('lodash')

module.exports = function (src) {
  src = src.replace('wrapper', 'div')
  src = src.replace(/inlineCode/g, 'code')

  // Transform markdown img tag
  const re = new RegExp(`(<img parentName="p".*\n.*\n.*\n.*</img>)`, 'g');
  src = _.replace(src, re, replacement => {
    const imgRe = /"src": "(.*)"/g
    const altRe = /"alt": "(.*)"/g

    const imgUrl = (imgRe.exec(replacement))[1]
    const imgAlt = altRe.exec(replacement)

    return  `<img src="${imgUrl}" alt="${imgAlt ? imgAlt[1] : null}" />`
  })

  return src
}
