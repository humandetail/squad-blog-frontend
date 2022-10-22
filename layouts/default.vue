<template>
  <div class="page-container">
    <LayoutAsideHeader />

    <div class="container">
      <LayoutContainer>
        <slot />
      </LayoutContainer>

      <LayoutAsideRight />
    </div>

    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: grid;
  gap: var(--gap);
  max-width: var(--container-width);
  height: 90vh;
  margin: 10vh auto;
  // padding: 0 var(--gap);

  .page-aside-header {
    grid-column: 1 / 5;
    grid-row: 1 / 22;
  }

  .container {
    display: grid;
    grid-template-columns: auto 300px;
    gap: var(--gap);
    grid-column: 5 / 24;
    grid-row: 1 / 22;
  }

  .page-footer {
    grid-column: 1 / 24;
    grid-row: 22 / 24;
  }

  @media screen and (max-width: 1920px) {
    padding: 0 var(--gap);
  }

  @media screen and (max-width: 1440px) {
    margin: 2vh auto 0;
    height: 98vh;

    .page-aside-header {
      grid-column: 1 / 24;
      grid-row: 1 / 3;
    }

    .container {
      grid-column: 1 / 24;
      grid-row: 3 / 22;
    }

    .page-footer {
      grid-column: 1 / 24;
      grid-row: 22 / 24;
    }
  }

  @media screen and (max-width: 960px) {
    .page-aside-header {
      grid-column: 1 / 24;
      grid-row: 1 / 3;
    }

    .container {
      display: block;
      grid-column: 1 / 24;
      grid-row: 3 / 22;

      .page-aside-right {
        margin-top: var(--gap);
      }
    }
  }
}
</style>
