<template>
  <div class="categories-page">
    <CommonBreadcrumb
      :routes="[
        { path: '', icon: 'tags',name: '标签' },
        { name: displayName }
      ]"
    />

    <div class="tags-container">
      <TagsWrapper />
      <LayoutAside />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tags = useTags()

const displayName = computed(() => {
  const name = route.params.name as string
  const item = tags.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})
</script>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  justify-content: space-between;
}
</style>
