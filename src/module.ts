import { defineNuxtModule, addRouteMiddleware, createResolver, extendPages } from '@nuxt/kit'

export interface ModuleOptions {
  enableMaintenanceMode: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-maintenance',
    configKey: 'maintenance',
  },

  defaults: {
    enableMaintenanceMode: false,
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    extendPages((pages) => {
      const exists = pages.find(page => page.name === 'maintenance')

      if (!exists) {
        pages.push({
          name: 'maintenance',
          file: resolver.resolve('./runtime/pages/maintenance.vue'),
          path: '/maintenance',
        })
      }
    })

    if (_options.enableMaintenanceMode) {
      addRouteMiddleware({
        name: 'catch-all',
        path: resolver.resolve('./runtime/middlewares/catch-all.ts'),
        global: true,
      })
    }
  },
})
