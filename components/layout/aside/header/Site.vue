<template>
  <div class="site-wrapper">
    <div class="site-logo">
      <nuxt-link
        to="/"
        class="site-link"
      >
        <img
          :src="settings.logoPic"
          :alt="settings.siteName"
        >
      </nuxt-link>

      <CommonIcon
        :icon="`theme-${mode}`"
        @click="handleSwitchMode"
      />
    </div>

    <div class="site-name">
      <nuxt-link
        to="/"
        class="site-link"
      >
        {{ settings.siteName }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const settings = useSettings()
const mode = useThemeMode()

const handleSwitchMode = () => {
  mode.value = mode.value === 'dark'
    ? 'light'
    : 'dark'
}
</script>
