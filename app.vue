<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getCategories, getSettings } from './config/api'

const settings = useSettings()
const categories = useCategories()

if (!settings.value) {
  const { data } = await getSettings()

  settings.value = data.value
}

getCategories().then(({ data }) => {
  categories.value = data.value.records ?? []
})

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
