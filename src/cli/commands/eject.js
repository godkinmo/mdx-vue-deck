import path from 'path'

import * as constants  from '../../constants'
import * as colors from '../colors'
import * as emoji from '../emoji'
import * as utils from '../utils'

export function run() {
  utils.header()

  const file = path.join(process.cwd(), 'theme.config.js')
  const simplePath = 'theme.config.js'

  utils.exists(file) && utils.die(colors.file(simplePath), 'already exists.')

  utils.copyFile(constants.tailwindThemeConfigFile, file)

  utils.log()
  utils.log(emoji.yes, 'Created Tailwind theme config file:', colors.file(simplePath))

  utils.footer()
}
