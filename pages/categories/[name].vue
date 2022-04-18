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
import { CATEGORIES } from '~~/config/api'
import { CategoriesData, PageResponseType } from '~~/types/response'

const route = useRoute()
const categories = useCategories()
const settings = useSettings()

if (!categories.value || categories.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<CategoriesData>>(CATEGORIES)
  categories.value = data.value.records || []
}

const displayName = computed(() => {
  const name = route.params.name as string
  const item = categories.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})

useHead({
  title: `${displayName.value} - ${settings.value.seoTitle}`
})
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  justify-content: space-between;
}
</style>
