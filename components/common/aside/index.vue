<template>
  <aside class="page-aside">
    <CommonAsideHot />
    <CommonAsideTags />
  </aside>
</template>

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
}
</style>
