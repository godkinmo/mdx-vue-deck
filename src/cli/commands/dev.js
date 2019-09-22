import * as utils from '../utils'

export function run({ flags }) {
  utils.vueCliService(
    'serve',
    '--host',
    flags.host,
    '--port',
    flags.port,
    flags.open && '--open'
  )
}
