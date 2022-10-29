<template>
  <aside class="page-aside-right">
    <div class="wrapper">
      <LayoutAsideRightSearch v-if="route.name !== 'search'" />

      <LayoutAsideRightRecommended />

      <LayoutAsideRightTags />
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style lang="scss" scoped>
.page-aside-right {
  padding: var(--gap24);
  overflow: hidden;

  .wrapper {
    height: 100%;
    padding: var(--gap24);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow-y: auto;
  }
}
</style>
