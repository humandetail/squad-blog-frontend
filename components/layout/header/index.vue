<template>
  <header class="page-header">
    <LayoutContainer>
      <div class="fluid left-fluid">
        <LayoutHeaderSite />
        <LayoutHeaderNav />
      </div>
      <div class="fluid right-fluid">
        <LayoutHeaderSearch />
        <LayoutHeaderThemeMode />

        <slot />
      </div>
    </LayoutContainer>
  </header>

  <LazyLayoutHeaderDropdown />
</template>

<style lang="scss" scoped>
.page-header {
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  ::v-deep(.container) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fluid {
      display: flex;
      align-items: center;
    }
  }
}
</style>
