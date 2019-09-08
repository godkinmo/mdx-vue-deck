#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const execa = require('execa');
const chalk = require('chalk')
const fs = require('fs-extra')
const pkg = require('./package.json')

const log = (...args) => {
  console.log(chalk.green('[mdx-wall]'), ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[err]'), ...args)
}

const cli = meow(
  `
  ${chalk.gray('Usage')}
    $ ${chalk.green('mdx-wall wall.mdx')}
    $ ${chalk.green('mdx-wall build wall.mdx')}
  ${chalk.gray('Options')}
      -h --host     Dev server host
      -p --port     Dev server port
      --no-open     Prevent from opening in default browser
`,
  {
    description: chalk.green('[mdx-wall] ') + chalk.gray(pkg.description),
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
    },
  }
)

const [cmd, file] = cli.input
const filename = file || cmd

if (!filename) cli.showHelp(0)


const linkFile = async () => {
  try {
    const srcpath = path.resolve(filename)
    const dstpath = path.join(__dirname,  'src/mdx/wall.mdx')

    await fs.remove(dstpath)
    await fs.ensureSymlink(srcpath, dstpath)
    log('success!')
  } catch (err) {
    log.error(err)
  }
}
linkFile()

const { flags } = cli

const vueCliService =  (...args) => {
  return execa('vue-cli-service', args.filter(Boolean), {
    cwd: __dirname,
    stdio: 'inherit',
    preferLocal: true,
    env: {
      VUE_APP_MDX_SRC: path.resolve(filename),
    },
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
