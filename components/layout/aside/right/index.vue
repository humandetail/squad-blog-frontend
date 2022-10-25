<template>
  <aside class="page-aside-right">
    <LayoutAsideRightSearch v-if="route.name !== 'search'" />

    <LayoutAsideRightRecommended />

    <LayoutAsideRightTags />
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style lang="scss" scoped>
.page-aside-right {
  background-color: rgba(0,0,0,.3);
}
</style>
