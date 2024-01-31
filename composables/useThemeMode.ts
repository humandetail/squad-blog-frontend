import { THEME_MODE_KEY } from '~/config/constants'

type ThemeMode = 'light' | 'dark'

export default () => {
  const themeMode = ref<'light' | 'dark'>('light')

  const toggle = () => {
    themeMode.value = themeMode.value === 'light'
      ? 'dark'
      : 'light'

    nextTick(() => {
      localStorage.setItem(THEME_MODE_KEY, themeMode.value)

      document.documentElement.setAttribute('data-theme', themeMode.value)
    })
  }

  onMounted(() => {
    const theme = localStorage.getItem(THEME_MODE_KEY) as ThemeMode

    if (['dark', 'light'].includes(theme)) {
      themeMode.value = theme
    }
  })

  return {
    themeMode,
    toggle
  }
}