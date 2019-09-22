import path from 'path'

import { deckMdxFile } from '../../constants'
import * as colors from '../colors'
import * as utils from '../utils'

export function run(_, filename) {
  const source = path.resolve(filename)

  !utils.exists(source) && utils.die(colors.file(filename), 'does not exists.')

  utils.symlinkFile(source, deckMdxFile)

  utils.vueCliService('build').then(() => {
    const source = path.resolve(__dirname, '../../dist')
    const destination = path.join(process.cwd(), 'dist')
    if (source === destination) return
    utils.copyFile(source, destination)
  })
}
