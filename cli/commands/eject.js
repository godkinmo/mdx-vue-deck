import path from 'path'

import * as constants  from '../../constants'
import * as colors from '../colors'
import * as emoji from '../emoji'
import * as utils from '../utils'

export function run() {
  utils.header()

  const file = path.join(process.cwd(), 'tailwind.config.js')
  const simplePath = 'tailwind.config.js'

  utils.exists(file) && utils.die(colors.file(simplePath), 'already exists.')

  utils.copyFile(constants.tailwindConfigFile, file)

  utils.log()
  utils.log(emoji.yes, 'Created Tailwind config file:', colors.file(simplePath))

  utils.footer()
}
