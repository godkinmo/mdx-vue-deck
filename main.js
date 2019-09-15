#!/usr/bin/env node

import path from 'path'
import meow from 'meow'
import execa from 'execa'
import fs from 'fs-extra'
import pkg from './package.json'
import * as colors from './cli/colors'

const cli = meow(
  `
  mdx-vue-deck ${colors.info(pkg.version)}

  Usage:
    mdx-vue-deck deck.mdx
    mdx-vue-deck build deck.mdx

  Options:
      -h --host     Dev server host
      -p --port     Dev server port
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

const srcPath = path.resolve(filename)
const dstPath = path.join(__dirname,  'src/mdx/deck.mdx')

if (! fs.existsSync(srcPath)) {
  console.error(colors.error(`${srcPath} does not exists`))
  process.exit(1)
}

const linkFile = () => {
  try {
    fs.removeSync(dstPath)
    fs.ensureSymlinkSync(srcPath, dstPath)
  } catch (err) {
    console.log(colors.error(err))
  }
}
linkFile()

const { flags } = cli

// if (flags.config) {
//   const configPath = path.resolve(flags.config)
//   const { default: deckConfig } = require(configPath)

//   console.log(deckConfig)
// }

const vueCliService =  (...args) => {
  return execa('vue-cli-service', args.filter(Boolean), {
    cwd: __dirname,
    stdio: 'inherit',
    preferLocal: true,
  })
}

switch (cmd) {
  case 'build':
    vueCliService('build').then(() => {
      const publicPath = path.join(__dirname, 'dist')
      const dist = path.join(process.cwd(), 'dist')
      if (publicPath === dist) return
      fs.copySync(publicPath, dist)
    })
    break
  case 'dev':
  default:
    vueCliService(
      'serve',
      '--host',
      flags.host,
      '--port',
      flags.port,
      flags.open && '--open'
    )
    break
}
