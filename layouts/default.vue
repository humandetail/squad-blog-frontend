<template>
  <div class="page-container">
    <CommonHeader />
    <div class="container">
      <main class="page-main">
        <NuxtPage />
      </main>
      <CommonAside />
    </div>
    <CommonFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: var(--container-width);
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height));

  .page-main {
    flex: 1;
    padding: var(--gap);
    min-width: 0;
  }
}
</style>
