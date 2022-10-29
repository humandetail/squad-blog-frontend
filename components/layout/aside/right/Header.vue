<template>
  <header class="aside-section-header">
    <CommonIcon
      v-if="icon"
      :icon="icon"
      :size="20"
      class="icon"
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

<style lang="scss" scoped>
.aside-section-header {
  display: flex;
  align-items: center;

  .icon {
    font-size: 18px;
  }

  .title {
    margin-left: 8px;
    font-size: 18px;
  }
}
</style>
