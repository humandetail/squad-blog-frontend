<template>
  <aside class="page-aside">
    <CommonAsideHot />
    <CommonAsideTags />
    <div
      id="toc"
      class="toc-container"
    ></div>
  </aside>
</template>

<!-- <script setup lang="ts">
const route = useRoute()

const isPostPage = computed(() => {
  return route.path === '/posts'
})
</script> -->

<style lang="scss" scoped>
.page-aside {
  width: var(--aside-width);
  padding: var(--gap);

  :deep(section) {
    .title {
      font-size: 1.8rem;
      padding: var(--gap-sm) 0;
      font-weight: 700;
      border-bottom: 1px solid var(--border-color);
    }

    & + section {
      margin-top: var(--gap);
    }
  }

  .toc-container:not(:empty) {
    position: sticky;
    top: var(--header-height);
    height: calc(100vh - var(--header-height) - var(--gap));
    overflow-y: auto;

    @media (max-width: 768px) {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      padding: var(--header-height) var(--gap) var(--gap);
      background-color: var(--bg);
    }

    &::before {
      content: '目录';
      position: sticky;
      top: 0;
      display: block;
      width: 100%;
      font-size: 1.8rem;
      padding: var(--gap-sm) 0;
      font-weight: 700;
      border-bottom: 1px solid var(--border-color);
      background-color: var(--bg);

      @media (max-width: 768px) {
        background-color: rgb(var(--bg)/.75);
        backdrop-filter: blur(.8rem);
      }
    }
  }
}
</style>
