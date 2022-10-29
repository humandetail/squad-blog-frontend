<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { setTheme } from './libs/utils'

const mode = useThemeMode()

onMounted(() => {
  setTheme(mode.value)
})

watch(mode, () => {
  setTheme(mode.value)
})
</script>
