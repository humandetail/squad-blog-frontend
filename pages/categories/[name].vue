<template>
  <div class="categories-page">
    <CommonBreadcrumb
      :routes="[
        { icon: '', name: '分类' },
        { name: displayName }
      ]"
    />

    <div class="categories-container">
      <CategoriesWrapper />
      <LayoutAside />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categories = useCategories()

const displayName = computed(() => {
  const name = route.params.name as string
  const item = categories.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  justify-content: space-between;
}
</style>
