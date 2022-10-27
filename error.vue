<template>
  <Page404 />
</template>

<script setup lang="ts">
import Page404 from '~~/pages/404.vue'
defineProps<{
  error: any
}>()
</script>
