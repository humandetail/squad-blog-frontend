<template>
  <div>
    <Html lang="zh-CN" />
    <Title>{{ settings.seoTitle }}</Title>
    <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <Meta name="keyword" :content="settings.seoKeywords" />
    <Meta name="descriptions" :content="settings.seoDescription" />
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <Style type="text/css" :children="`:root { ${rootVar} }`"></Style>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { SETTINGS } from './config/api'
import { Settings } from './types/response'
import { Theme } from '~~/config/constants'
import themeConfig from '~~/config/theme.config'

const theme = ref(Theme.default)
const settings = useSettings()

const rootVar = computed(() => {
  return Object.entries(themeConfig).map(([name, colors]) => `--${name}: ${colors[theme.value]};`).join('')
})

if (!settings.value) {
  const { data } = await useCustomFetch<Settings>(SETTINGS)
  settings.value = data.value
}
</script>
