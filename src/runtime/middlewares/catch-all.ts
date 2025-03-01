import { navigateTo, defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  if (to.name !== 'maintenance') {
    return navigateTo({
      name: 'maintenance',
    })
  }
})
