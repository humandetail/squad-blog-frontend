<template>
  <section class="categories-wrapper">
    <CommonLoading :loading="loading">
      <div class="posts">
        <CategoriesItem
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
import { POSTS_CATEGORIES } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PageResponseType, PostItem } from '~~/types/response'

const route = useRoute()

const categoryName = computed(() => route.params.name)

const records = ref<PostItem[]>([])
const loading = ref(false)

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_CATEGORIES, {
    params: {
      name: categoryName.value,
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
  pageSize: 10,
  onPageChange: onPaginationChange,
  onPageSizeChange: onPaginationChange
})

onPaginationChange({ currentPage: 1, currentPageSize: 10 })
</script>

<style lang="scss" scoped>
.categories-wrapper {
  width: var(--wrapper-width);
  padding: .48rem;
  border-radius: .16rem;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .posts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
