/*!
 * Router Global middleware
 */

import { SETTINGS } from '~/config/api'
import { Settings } from '~/types/response'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const settings = useSettings()

  if (!settings.value) {
    const { data } = await useCustomFetch<Settings>(SETTINGS)
    settings.value = data.value
  }

  switch (settings.value?.status) {
    case 0:
    case 3:
      if (to.name === 'maintenance') {
        return navigateTo('/')
      }
      break
    case 1:
    case 2:
    default:
      if (to.name !== 'maintenance') {
        return navigateTo('/maintenance')
      }
  }
})
