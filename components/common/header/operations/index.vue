<template>
  <section class="operations">
    <CommonHeaderOperationsSearch />
    <CommonHeaderOperationsThemeModeButton />
    <CommonHeaderOperationsMenuButton />
    <CommonHeaderOperationsTOCButton />
  </section>
</template>

<style lang="scss" scoped>
.operations {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}
:deep(.btn) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  border: 0;
  color: var(--secondary-text);
  border-radius: .4rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: var(--btn-bg);
  }
}
</style>
