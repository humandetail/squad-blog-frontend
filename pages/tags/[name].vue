<template>
  <InfiniteScrolling
    :loading="loading"
    :no-more="noMore"
    @reach-bottom="request"
  >
    <div class="categories">
      <Breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <ArticleItem1
        v-for="item of data"
        :key="item.id"
        :record="item"
      />
    </div>
  </InfiniteScrolling>
</template>

<script setup lang="ts">
import { getPostByTagName } from '~/config/api'
import type { Breadcrumb } from '~/types'
import type { PostItem } from '~/types/response'

const route = useRoute()
const tags = useTags()

const { loading, noMore, data, request } = usePageFetch<PostItem>(getPostByTagName, 1, 10, { name: route.params.name })

const breadcrumbs = computed(() => {
  return [
    {
      value: route.params.name,
      icon: 'tags'
    }
  ] as Breadcrumb[]
})

const displayName = computed(() => {
  return tags.value.find(item => item.name === route.params.name)?.displayName
})

useHead({
  title: displayName.value
})
</script>
