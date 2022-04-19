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

definePageMeta({
  key: route => 'categories-' + route.params.name,
  pageTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__rollIn',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  },
  layoutTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__zoomInUp',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  }
})

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
