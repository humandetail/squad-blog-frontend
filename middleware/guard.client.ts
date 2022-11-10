/*!
 * 全局导航守卫
 */
import { getSettings } from '~/config/api'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const settings = useSettings()

  if (!settings.value) {
    try {
      const { data } = await getSettings()
      settings.value = data.value
    } catch {}
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
