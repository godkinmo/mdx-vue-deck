import path from 'path'

import * as constants  from '../../constants'
import * as colors from '../colors'
import * as utils from '../utils'

export function run({ flags }, filename) {
  // if (flags.config) {
  //   const tailwindConfig = path.resolve(flags.config)
  //   !utils.exists(tailwindConfig) && utils.die(colors.file(flags.config), 'does not exists')

  //   process.env.__TAILWIND_CONFIG_PATH__ = tailwindConfig
  // }

  const source = path.resolve(filename)
  const destination = constants.deckMdxFile

  !utils.exists(source) && utils.die(colors.file(filename), 'does not exists.')

  utils.symlinkFile(source, destination)

  utils.vueCliService(
    'serve',
    '--host',
    flags.host,
    '--port',
    flags.port,
    flags.open && '--open'
  )
}
