import path from 'path'
import * as utils from '../utils'

export function run() {
  utils.vueCliService('build').then(() => {
    const source = path.resolve(__dirname, '../../../dist')
    const destination = path.join(process.cwd(), 'dist')
    if (source === destination) return
    utils.copyFile(source, destination)
  })
}
