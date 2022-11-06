<template>
  <aside class="page-aside-right">
    <div id="J_aside-right-wrapper" class="wrapper">
      <LayoutAsideRightSearch v-if="route.name !== 'search'" />

      <div id="post-toc" class="post-toc" />

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
    position: relative;
    height: 100%;
    padding: var(--gap24);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow-y: auto;

    .post-toc:not(:empty) {
      margin-bottom: var(--gap24);
    }
  }
}
</style>
