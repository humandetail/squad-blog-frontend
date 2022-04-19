<template>
  <div class="search-page">
    <SearchInput
      v-model:keyword="keyword"
      :loading="loading"
      @search="handleSearch"
    />
    <ClientOnly>
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
        <CommonPaginationWrapper v-if="alreadySearch" :pagination="pagination" />
      </CommonLoading>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { POSTS_SEARCH } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PageResponseType, PostItem } from '~~/types/response'

definePageMeta({
  key: 'search',
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

const settings = useSettings()

useHead({
  title: `搜索 - ${settings.value.seoTitle}`
})

const records = ref<PostItem[]>([])
const keyword = ref()
const alreadySearch = ref(false)
const loading = ref(false)

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_SEARCH, {
    params: {
      keyword: keyword.value,
      current: currentPage,
      pageSize: currentPageSize
    }
  })

  records.value = data.value.records || []
  pagination.total.value = data.value.total

  alreadySearch.value = true
  loading.value = false
}

const pagination = usePagination({
  page: 1,
  pageSize: 10,
  onPageChange: onPaginationChange,
  onPageSizeChange: onPaginationChange
})

const handleSearch = () => {
  if (!keyword.value) {
    alreadySearch.value = false
    records.value = []
    return
  }
  onPaginationChange({ currentPage: 1, currentPageSize: 10 })
}
</script>

<style lang="scss" scoped>
.search-page {
  width: 6.4rem;
  min-height: 50vh;
  margin: 1.08rem auto;

  > * {
    margin: .24rem 0;
  }
}
</style>
