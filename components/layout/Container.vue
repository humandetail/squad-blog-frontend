<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 12.8rem;
  margin: 0 auto;

  @media screen and (max-width: 1280px) {
    width: 100%;
    padding: 0 .24rem;
  }
}
</style>
