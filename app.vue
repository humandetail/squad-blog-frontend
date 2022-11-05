<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { setTheme } from './libs/utils'

const mode = useThemeMode()

onMounted(() => {
  const localeMode = localStorage.getItem('HUMANDETAIL_THEME')
  if (localeMode === 'dark' || localeMode === 'light') {
    mode.value = localeMode
  }
  setTheme(mode.value)
})

watch(mode, () => {
  setTheme(mode.value)
})
</script>
