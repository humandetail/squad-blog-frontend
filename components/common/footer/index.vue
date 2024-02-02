<template>
  <footer class="page-footer">
    <CommonFooterBlogroll />
    <CommonFooterCopyright />
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  padding: var(--gap);
  border-top: 1px solid var(--border-color);
}
</style>
