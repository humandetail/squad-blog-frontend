<template>
  <Html
    lang="zh-CN"
    :style="settings && settings.status === 3 ? 'filter: grayscale(100%)' : undefined"
  />

  <!-- eslint-disable-next-line vue/html-self-closing -->
  <Style type="text/css" :children="`:root { ${currentTheme} }`"></Style>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { dark, light } from '~~/config/theme'

const mode = useThemeMode()
const settings = useSettings()

useHead({
  titleTemplate: titleChunk => titleChunk
    ? `${titleChunk} - ${settings.value.seoTitle}`
    : settings.value.seoTitle,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
    { name: 'keywords', content: settings.value.seoKeywords },
    { name: 'descriptions', conetnt: settings.value.seoDescription }
  ]
})

const currentTheme = computed(() => {
  const theme = mode.value === 'dark'
    ? dark
    : light

  return Object.entries(theme).reduce((prev, [key, value]) => {
    return prev + `--${key}: ${value};`
  }, `color-scheme: ${mode};`)
})

onMounted(() => {
  const localeMode = localStorage.getItem('HUMANDETAIL_THEME')
  if (localeMode === 'dark' || localeMode === 'light') {
    mode.value = localeMode
  }
})
</script>
