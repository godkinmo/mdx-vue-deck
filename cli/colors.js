import chalk from 'chalk'

/**
 * Applies colors to emphasize
 *
 * @param {...string} msgs
 */
export function bold(...msgs) {
  return chalk.bold(...msgs)
}

/**
 * Applies colors to inform
 *
 * @param {...string} msgs
 */
export function info(...msgs) {
  return chalk.bold.cyan(...msgs)
}

/**
 * Applies colors to signify error
 *
 * @param {...string} msgs
 */
export function error(...msgs) {
  return chalk.bold.red(...msgs)
}
