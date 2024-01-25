<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getSettings } from './config/api'

const settings = useSettings()

if (!settings.value) {
  const { data } = await getSettings()

  settings.value = data.value
}
</script>
