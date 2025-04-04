import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addRouteMiddleware, createResolver, extendPages } from '@nuxt/kit'
import { defu } from 'defu'
import * as rc from 'rc9'
import { RC_FILENAME } from './utils/rc'

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

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.runtimeConfig.public.maintenizr = defu<ModuleOptions, ModuleOptions[]>(
      nuxt.options.runtimeConfig.public.maintenizr,
      {
        enabled: options.enabled,
      },
    )

    extendPages((pages) => {
      const exists = pages.find(page => page.name === 'maintenance')

      if (!exists) {
        pages.push({
          name: 'maintenance',
          file: resolve(runtimeDir, 'pages/maintenance.vue'),
          path: '/maintenance',
        })
      }
    })

    const disabledByConf = (conf: any) => conf.maintenizr === false || (conf.maintenizr && conf.maintenizr.enabled === false)

    if (!disabledByConf(rc.read({ name: RC_FILENAME, dir: nuxt.options.rootDir }))) {
      addRouteMiddleware({
        name: 'catch-all',
        path: resolve(runtimeDir, 'middlewares/catch-all'),
        global: true,
      })
    }
  },
})
