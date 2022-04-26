<template>
  <div>
    <Html
      lang="zh-CN"
      :data-theme-mode="Theme[themeMode]"
      :style="settings && settings.status === 3 ? 'filter: grayscale(100%)' : undefined"
    />
    <Title>{{ settings.seoTitle }}</Title>
    <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <Meta name="keyword" :content="settings.seoKeywords" />
    <Meta name="description" :content="settings.seoDescription" />
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <Style type="text/css" :children="`:root { ${rootVar} }`"></Style>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import MobileDetect from 'mobile-detect'
import { Theme } from './config/constants'
import themeConfig from '~~/config/theme.config'

const themeMode = useThemeMode()
const settings = useSettings()
const route = useRoute()

const rootVar = computed(() => {
  return Object.entries(themeConfig).map(([name, colors]) => `--${name}: ${colors[themeMode.value]};`).join('')
})

onMounted(() => {
  const md = new MobileDetect(window.navigator.userAgent)
  if (import.meta.env.MODE === 'production' && md.mobile()) {
    location.replace('https://m.humandetail.com' + route.fullPath)
  }
})
</script>
