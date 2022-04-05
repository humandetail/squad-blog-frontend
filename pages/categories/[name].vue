<template>
  <div class="categories-page">
    <CommonBreadcrumb
      :routes="[
        { icon: 'category', name: '分类' },
        { name: 'PHP' }
      ]"
    />

    <div class="categories-container">
      <CategoriesWrapper />
      <LayoutAside />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  justify-content: space-between;
}
</style>
