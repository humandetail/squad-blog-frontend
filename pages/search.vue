<template>
  <div class="page-search">
    <SearchInput :keyword="keyword" />

    <CommonLoading :loading="loading">
      <SearchTips
        v-if="alreadySearch"
        :keyword="keyword"
        :total="pagination.total.value"
      />
      <SearchSuggestion
        v-if="alreadySearch && pagination.total.value <= 0"
      />
      <SearchResult
        :records="records"
        :keyword="keyword"
      />
      <CommonPagination v-if="alreadySearch" :pagination="pagination" />
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { getPostsByKeywods } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PostItem } from '~~/types/response'

const route = useRoute()

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await getPostsByKeywods({
    keyword: keyword.value,
    current: currentPage,
    pageSize: currentPageSize
  })

  records.value = data.value.records
  pagination.total.value = data.value.total
  alreadySearch.value = true
  loading.value = false
}

const records = ref<PostItem[]>([])
const alreadySearch = ref(false)
const loading = ref(false)
const pagination = usePagination({
  page: 1,
  pageSize: 10,
  onPageChange: onPaginationChange,
  onPageSizeChange: onPaginationChange
})

const keyword = computed(() => {
  const keyword = route.query.keyword
  if (Array.isArray(keyword)) {
    return keyword[0]
  }
  return keyword
})

watch(keyword, () => {
  if (!keyword.value) {
    records.value = []
    alreadySearch.value = false
    pagination.total.value = 0
    return
  }

  onPaginationChange({ currentPage: 1, currentPageSize: 10 })
}, { immediate: true })
</script>
