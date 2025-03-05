import { resolve } from 'node:path'

export default defineNuxtConfig({
  modules: [
    'nuxt-maintenizr',
  ],
  alias: {
    'nuxt-maintenizr': resolve(__dirname, '../../../src/module.ts'),
  },
})
