<template>
  <header class="page-aside-header">
    <div class="wrapper">
      <LayoutAsideHeaderSite />

      <LayoutAsideHeaderNav />

      <LayoutAsideHeaderBlogrolls />
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.page-aside-header {
  padding: var(--gap24);
  overflow: hidden;

  @media screen and (max-width: 1440px) {
    overflow: unset;
  }

  @media screen and (max-width: 768px) {
    position: sticky;
    top: 0;
    z-index: 999;
    margin: 0 var(--negative-gap24);
    border-radius: 0 !important;
    background-color: var(--background-color);
  }

  .wrapper {
    height: 100%;
    padding: var(--gap24);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow-y: auto;

    @media screen and (max-width: 1440px) {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      gap: var(--gap16);
      position: relative;
      padding: var(--gap16) 48px var(--gap16) var(--gap16);
      overflow-y: unset;
    }

    @media screen and (max-width: 768px) {
      padding: var(--gap16) 48px var(--gap16) var(--gap16);
      gap: var(--gap32);
    }
  }
}
</style>
