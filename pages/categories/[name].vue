<template>
  <div class="page-categories">
    <CommonLoading :loading="loading">
      <section class="posts">
        <PostItem
          v-for="record of records"
          :key="record.id"
          :record="record"
          class="post-item-category"
        />
      </section>

      <CommonPagination :pagination="pagination" />
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { getPostByCategoryName } from '~~/config/api'
import { PaginationChangeType } from '~~/types/pagination'
import { PostItemType } from '~~/types/response'

definePageMeta({
  key: route => `Categories-${route.params.name}`
})

const route = useRoute()

const loading = ref(false)
const records = ref<PostItemType[]>([])

const categories = useCategories()

const categoryName = computed(() => {
  const name = route.params.name
  if (Array.isArray(name)) {
    return name[0].trim()
  }
  return name.trim()
})

const displayName = computed(() => {
  const item = categories.value.find(item => item.name === categoryName.value)
  return item ? item.displayName : '-'
})

const onPaginationChange = async ({ currentPage, currentPageSize }: PaginationChangeType) => {
  loading.value = true
  const { data } = await getPostByCategoryName({
    name: categoryName.value,
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

useHead({
  title: displayName
})
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.post-item-category {
  display: block;
  gap: unset;
  width: calc(50% - 12px);
  min-width: 0;
  border-radius: var(--border-radius);
  box-shadow: -3px -3px 6px var(--shadow-color-light), 3px 3px 6px var(--shadow-color-dark);

  &:hover {
    box-shadow: -3px -3px 6px var(--shadow-color-light), 3px 3px 6px var(--shadow-color-dark);
  }

  :deep(.cover-pic-with-link) {
    display: block;
    width: 100%;
    .cover-pic {
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);

      img {
        max-width: 100% !important;
        max-height: 100% !important;
      }
    }
  }

  :deep(.title) {
    display: flex;
    align-items: center;
    margin-top: var(--gap24);
    padding: 0 var(--gap24);

    a {
      line-height: 1;
      color: var(--primary-text);
      @include ellipsis;

      &:hover {
        color: var(--primary-text);
      }
    }
  }

  :deep(.summary) {
    line-height: 24px;
    max-height: 48px;
    margin-top: var(--gap24);
    padding: 0 var(--gap24);
    color: var(--secondary-text);
    @include multi-ellipsis(2);
  }

  :deep(.widgets) {
    margin: var(--gap24) 0;
    padding: 0 var(--gap24);
  }
}
</style>
