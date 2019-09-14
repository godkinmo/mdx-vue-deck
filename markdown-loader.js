const _ = require('lodash')

module.exports = function (src) {
  src = src.replace('wrapper', 'div')
  src = src.replace(/inlineCode/g, 'code')

  /* eslint-disable-next-line */
  const imgRe = new RegExp(`(<img parentName="p"(.|\r|\n)*?<\/img>)`, 'g');
  src = _.replace(src, imgRe, replacement => {
    const imgRe = /"src": "(.*)"/g
    const altRe = /"alt": "(.*)"/g

    const imgUrl = (imgRe.exec(replacement))[1]
    const imgAlt = altRe.exec(replacement)

    return `<img src="${imgUrl}" ${imgAlt ? `alt="${imgAlt[1]}"` : ''} />`
  })

  /* eslint-disable-next-line */
  const codeRe = new RegExp(`(<code parentName="pre"(.|\r|\n)*?<\/code>)`, 'g');
  src = _.replace(src, codeRe, replacement => {
    const classNameRe = /"className": "(.*)"/g
    const className = classNameRe.exec(replacement)

    const codeRe = /<code parentName="pre"(.|\r|\n)*?>({`(.|\r|\n)*?`})<\/code>/g
    const code = (codeRe.exec(replacement))[2]

    return `<code ${className ? `class='${className[1]}'` : ''}>${code}</code>`
  })

  return src
}
