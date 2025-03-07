import { defineNuxtModule, addRouteMiddleware, createResolver, extendPages } from '@nuxt/kit'
import { defu } from 'defu'
import * as rc from 'rc9'
import { logger } from './utils/log'
import { RC_FILENAME, setRC } from './utils/rc'

export interface ModuleOptions {
  enabled: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-maintenizr',
    configKey: 'maintenizr',
  },

  defaults: {
    enabled: false,
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.maintenizr = defu<ModuleOptions, ModuleOptions[]>(
      nuxt.options.runtimeConfig.public.maintenizr,
      {
        enabled: options.enabled,
      },
    )

    if (!nuxt.options.build.transpile) {
      nuxt.options.build.transpile = []
    }

    nuxt.options.build.transpile.push('nuxt-maintenizr')

    extendPages((pages) => {
      const exists = pages.find(page => page.name === 'maintenance')

      if (!exists) {
        pages.push({
          name: 'maintenance',
          file: resolve('./runtime/pages/maintenance.vue'),
          path: '/maintenance',
        })
      }
    })

    const disabledByConf = (conf: any) => conf.maintenizr === false || (conf.maintenizr && conf.maintenizr.enabled === false)

    if (!disabledByConf(rc.read({ name: RC_FILENAME, dir: nuxt.options.rootDir }))) {
      addRouteMiddleware({
        name: 'catch-all',
        path: resolve('./runtime/middlewares/catch-all.ts'),
        global: true,
      })
    }
  },
})
