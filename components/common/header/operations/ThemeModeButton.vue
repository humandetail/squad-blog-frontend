<template>
  <button
    class="btn btn-theme-mode"
    @click="handleThemeModeBtnClick"
  >
    <CommonIcon
      :icon="`theme-${themeMode}`"
      :size="2"
    />
  </button>
</template>

<script setup lang="ts">
import { THEME_MODE_KEY } from '~/config/constants'

const themeMode = ref<'light' | 'dark'>('light')


const handleThemeModeBtnClick = () => {
  themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'

  localStorage.setItem(THEME_MODE_KEY, themeMode.value)

  document.documentElement.setAttribute('data-theme', themeMode.value)
}

onMounted(() => {
  const theme = localStorage.getItem(THEME_MODE_KEY) as 'light' | 'dark'

  if (theme) {
    themeMode.value = theme
  }
})
</script>
