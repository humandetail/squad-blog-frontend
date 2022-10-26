<template>
  <div class="page-tags">
    <CommonLoading :loading="loading">
      <section class="posts">
        <PostItem
          v-for="record of records"
          :key="record.id"
          :record="record"
          class="post-item-tag"
        />
      </section>

      <CommonPagination :pagination="pagination" />
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { getPostByTagName } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PostItemType } from '~~/types/response'

const route = useRoute()

const loading = ref(false)
const records = ref<PostItemType[]>([])

const tagName = computed(() => {
  const name = route.params.name
  if (Array.isArray(name)) {
    return name[0].trim()
  }
  return name.trim()
})

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await getPostByTagName({
    name: tagName.value,
    current: currentPage,
    pageSize: currentPageSize
  })
  records.value = data.value.records || []
  pagination.total.value = data.value.total
  loading.value = false
}

const pagination = usePagination({
  page: 1,
  pageSize: 10,
  onPageChange: onPaginationChange,
  onPageSizeChange: onPaginationChange
})

onPaginationChange({ currentPage: 1, currentPageSize: 10 })
</script>
