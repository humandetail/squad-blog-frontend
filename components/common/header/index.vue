<template>
  <header class="page-header">
    <CommonHeaderLogo />

    <CommonHeaderNav />

    <CommonHeaderOperations />
  </header>
</template>

<script setup lang="ts">
const menuBtnActive = ref(false)

const router = useRouter()

provide('menuBtnActive', menuBtnActive)

router.afterEach(() => {
  menuBtnActive.value = false
})
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: calc(var(--gap-lg) + 0.2rem);
  position: sticky;
  top: 0;
  z-index: 10;
  height: var(--header-height);
  padding: 0 var(--gap);
  background-color: rgb(var(--bg)/.75);
  backdrop-filter: blur(.8rem);

  :deep(.operations) {
    margin-left: auto;
  }
}
</style>
