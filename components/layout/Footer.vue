<template>
  <footer class="page-footer">
    <div class="footer-container">
      <LayoutContainer>
        <LayoutFooterBlogrolls />
        <LayoutFooterCopyright />
      </LayoutContainer>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  position: relative;
  margin-top: .48rem;
  * { color: var(--footer-text-color) !important; }

  .footer-container {
    background-color: var(--footer-background);
  }
}
</style>
