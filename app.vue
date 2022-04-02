<template>
  <div>
    <Html lang="zh-CN" />
    <Title>123</Title>
    <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <Meta name="keyword" content="细节个人博客，个人博客" />
    <Meta name="descriptions" content="别在意这些细节" />
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <Style type="text/css" :children="`:root { ${rootVar} }`"></Style>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { Theme } from '~~/config/constants'
import themeConfig from '~~/config/theme.config'

const theme = ref(Theme.default)

const rootVar = computed(() => {
  return Object.entries(themeConfig).map(([name, colors]) => `--${name}: ${colors[theme.value]};`).join('')
})
</script>

<style>
html {
  font-size: 18px;
  font-family: BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-sans;
}
body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--primary-text);
}
</style>
