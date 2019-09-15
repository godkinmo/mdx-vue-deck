#!/usr/bin/env node

import meow from 'meow'
import pkg from './package.json'
import commands from './cli/commands'

import * as colors from './cli/colors'

const cli = meow(
  `
  mdx-vue-deck ${colors.info(pkg.version)}

  Usage:
    mdx-vue-deck deck.mdx
    mdx-vue-deck deck.mdx -c tailwind.config.js
    mdx-vue-deck build deck.mdx
    mdx-vue-deck eject

  Options:
      -h --host     Dev server host
      -p --port     Dev server port
      -c --config   Use custom theme config file
      --no-open     Prevent from opening in default browser
`,
  {
    description: false,
    flags: {
      port: {
        type: 'string',
        alias: 'p',
        default: '8000',
      },
      host: {
        type: 'string',
        alias: 'h',
        default: 'localhost',
      },
      open: {
        type: 'boolean',
        alias: 'o',
        default: true,
      },
      config: {
        type: 'string',
        alias: 'c',
      }
    },
  }
)

const cmd = cli.input[0]
const file = cli.input[1]

const filename = file || cmd

if (!filename) cli.showHelp(0)

const command = {
  dev: 'dev',
  build: 'build',
  eject: 'eject',
}[cmd] || 'dev'

process.env.__TAILWIND_CONFIG_PATH__ = './tailwind.config.js'

commands[command].run(cli, filename)
