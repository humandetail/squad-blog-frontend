<template>
  <div class="categories-page">
    <CommonBreadcrumb
      :routes="[
        { path: 'categories', icon: 'category',name: '分类' },
        { name: 'PHP' }
      ]"
    />

    <div class="tags-container">
      <TagsWrapper />
      <LayoutAside />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  justify-content: space-between;
}
</style>
