import path from 'path'
import execa from 'execa'
import { copySync, ensureSymlinkSync, existsSync, removeSync } from 'fs-extra'

import * as colors from './colors'
import * as emoji from './emoji'
import packageJson from '../../package.json'

/**
 * Prints messages to console.
 *
 * @param {...string} [msgs]
 */
export function log(...msgs) {
  console.log('  ', ...msgs)
}

/**
 * Prints application header to console.
 */
export function header() {
  log()
  log(colors.bold(packageJson.name), colors.info(packageJson.version))
}

/**
 * Prints application footer to console.
 */
export function footer() {
  log()
}

/**
 * Prints error messages to console.
 *
 * @param {...string} [msgs]
 */
export function error(...msgs) {
  log()
  console.error('  ', emoji.no, colors.error(msgs.join(' ')))
}

/**
 * Kills the process. Optionally prints error messages to console.
 *
 * @param {...string} [msgs]
 */
export function die(...msgs) {
  msgs.length && error(...msgs)
  footer()
  process.exit(1)
}

/**
 * Checks if path exists.
 *
 * @param {string} path
 * @return {boolean}
 */
export function exists(path) {
  return existsSync(path)
}

/**
 * Copies file source to destination.
 *
 * @param {string} source
 * @param {string} destination
 */
export function copyFile(source, destination) {
  copySync(source, destination)
}

/**
 * Link file source to destination.
 *
 * @param {string} source
 * @param {string} destination
 */
export function symlinkFile(source, destination) {
  removeSync(destination)
  ensureSymlinkSync(source, destination)
}

/**
 * Run vue-cli-service command
 */
export function vueCliService(...args) {
  return execa('vue-cli-service', args.filter(Boolean), {
    cwd: path.resolve(__dirname, '../../'),
    stdio: 'inherit',
    preferLocal: true,
  })
}
