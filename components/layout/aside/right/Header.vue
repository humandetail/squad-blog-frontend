<template>
  <header class="aside-section-header">
    <CommonIcon
      v-if="icon"
      :icon="icon"
      :size="20"
    />
    <h2 class="title">
      {{ title }}
    </h2>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>
