<template>
  <main class="main-wrapper">
    <div id="J_main-wrapper" class="wrapper">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-wrapper {
  padding: var(--gap24);
  overflow: hidden;
  .wrapper {
    height: 100%;
    padding: var(--gap24);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow-y: auto;
  }
}
</style>
