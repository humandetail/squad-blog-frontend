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
import { TAGS } from '~~/config/api'
import { PageResponseType, TagsData } from '~~/types/response'

const route = useRoute()
const tags = useTags()
const settings = useSettings()

if (!tags.value || tags.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<TagsData>>(TAGS)
  tags.value = data.value.records || []
}

const displayName = computed(() => {
  const name = route.params.name as string
  const item = tags.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})

useHead({
  title: `${displayName.value} - ${settings.value.seoTitle}`
})
</script>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  justify-content: space-between;
}
</style>
