<template>
  <section class="tags-wrapper">
    <CommonLoading :loading="loading">
      <div class="posts">
        <TagsItem
          v-for="record in records"
          :key="record.id"
          :record="record"
        />
      </div>

      <CommonPaginationWrapper :pagination="pagination" />
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { POSTS_TAGS } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PageResponseType, PostItem } from '~~/types/response'

const route = useRoute()

const tagName = computed(() => route.params.name)

const records = ref<PostItem[]>([])
const loading = ref(false)

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_TAGS, {
    params: {
      name: tagName.value,
      current: currentPage,
      pageSize: currentPageSize
    }
  })

  records.value = data.value.records || []
  pagination.total.value = data.value.total

  loading.value = false
}

const pagination = usePagination({
  page: 1,
  pageSize: 2,
  onPageChange: onPaginationChange,
  onPageSizeChange: onPaginationChange
})

onPaginationChange({ currentPage: 1, currentPageSize: 2 })
</script>

<style lang="scss" scoped>
.tags-wrapper {
  flex: 1;
  margin-right: .2rem;

  ::v-deep(.common-pagination-wrapper) {
    padding: .16rem;
    background-color: var(--plain-color);
    border-radius: .16rem;
    box-shadow: var(--box-shadow);
  }
}
</style>
