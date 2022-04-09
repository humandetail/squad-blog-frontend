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
  // padding-top: 1.2rem;
  * { color: var(--footer-text-color) !important; }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -1.2rem;
    z-index: -1;
    border-bottom: 1.2rem solid var(--footer-background);
    border-left: 100vw solid transparent;
    border-right: 0 solid transparent;
  }

  .footer-container {
    background-color: var(--footer-background);
  }
}
</style>
