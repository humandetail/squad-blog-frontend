<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage
      :page-key="route => route.fullPath"
      :keepalive="true"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getSettings } from './config/api'

const settings = useSettings()

if (!settings.value) {
  const { data } = await getSettings()

  settings.value = data.value
}

useHead({
  titleTemplate: (titleChunks) => {
    return titleChunks
      ? `${titleChunks} - ${settings.value?.seoTitle ?? ''}`
      : settings.value?.seoTitle ?? ''
  },
  meta: [
    { name: 'keywords', content: settings.value?.seoKeywords },
    { name: 'description', content: settings.value?.seoDescription }
  ]
})
</script>
