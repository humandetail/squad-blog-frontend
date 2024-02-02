<template>
  <button
    class="btn btn-theme-mode"
    aria-label="button"
    @click="handleThemeModeBtnClick"
  >
    <CommonIcon
      :icon="`theme-${themeMode}`"
      :size="2"
    />
  </button>
</template>

<script setup lang="ts">
import { sendMessageToGiscus } from '~/utils'

const { themeMode, toggle } = useThemeMode()

const handleThemeModeBtnClick = () => {
  toggle()

  sendMessageToGiscus({
    setConfig: {
      theme: themeMode.value
    }
  })
}
</script>
