import { resolve } from 'pathe'
import * as rc from 'rc9'
import { colors as c } from 'consola/utils'
import { consola } from 'consola'
import { loadNuxtConfig } from '@nuxt/kit'
import { isTest } from 'std-env'
import { createMain, defineCommand } from 'citty'
import { version } from '../package.json'

import { RC_FILENAME, setRC } from './utils/rc'

const sharedArgs = {
  dir: {
    type: 'positional',
    default: '.',
  },
} as const

export const main = createMain({
  meta: {
    name: 'nuxt-maintenizr',
    description: 'Manage application\'s availability status with Nuxt Maintenizr.',
    version,
  },
  args: sharedArgs,
  subCommands: {
    status: defineCommand({
      meta: {
        name: 'status',
        description: 'Check status of maintenance mode',
      },
      args: sharedArgs,
      async run({ args }) {
        ensureNuxtProject(args)

        const dir = resolve(args.dir)

        await showStatus(dir)
      },
    }),

    down: defineCommand({
      meta: {
        name: 'down',
        description: 'Enable maintenance mode',
      },
      args: sharedArgs,
      async run({ args }) {
        ensureNuxtProject(args)

        const dir = resolve(args.dir)
        setRC(dir, 'maintenizr.enabled', true)

        consola.info('You can turn on your application with `npx nuxt-maintenizr up`')

        await showStatus(dir)
      },
    }),

    up: defineCommand({
      meta: {
        name: 'up',
        description: '',
      },
      args: sharedArgs,
      async run({ args }) {
        ensureNuxtProject(args)

        const dir = resolve(args.dir)
        setRC(dir, 'maintenizr.enabled', false)

        consola.info('You can turn off your application with `npx nuxt-maintenizr down`')

        await showStatus(dir)
      },
    }),
  },
})

async function showStatus(dir: string) {
  if (isTest) {
    consola.info('You\'re in a test environment.')

    return
  }

  const disabledByConf = (conf: any) => conf.maintenizr === false || (conf.maintenizr && conf.maintenizr.enabled === false)

  if (disabledByConf(rc.read({ name: RC_FILENAME, dir }))) {
    consola.info(`Your application is now ${c.green('live')}.`)
  } else {
    consola.info(`Your application is now ${c.red('down')}.`)
  }
}

async function ensureNuxtProject(args: { dir: string }) {
  const dir = resolve(args.dir)

  const nuxtConfig = await loadNuxtConfig({ cwd: dir })

  if (!nuxtConfig || !nuxtConfig._layers[0]?.configFile) {
    consola.error('You are not in a Nuxt project.')

    process.exit()
  }
}
