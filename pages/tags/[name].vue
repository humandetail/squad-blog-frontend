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

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';
.post-item-tag {
  display: grid;
  grid-template-columns: 35% 65%;
  padding: var(--gap16);
  border-radius: var(--border-radius);

  &:hover {
    box-shadow: -3px -3px 6px var(--shadow-color-light), 3px 3px 6px var(--shadow-color-dark);
  }

  &:not(:first-child) {
    margin-top: var(--gap32);
  }

  :deep(.cover-pic-with-link) {
    grid-row: 1 / 5;
    .cover-pic {
      border-radius: var(--gap16);
    }
  }

  :deep(.title) {
    display: flex;
    align-items: center;
    grid-template-rows: 100%;
    grid-row: 1 / 2;
    a {
      line-height: 1;
      @include ellipsis;
    }
  }

  :deep(.summary) {
    grid-row: 2 / 4;
    line-height: 20px;
    max-height: 60px;
    @include multi-ellipsis(3);
  }
  :deep(.widgets) {
    grid-row: 4 / 5;
  }
}
</style>
