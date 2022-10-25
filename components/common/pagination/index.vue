<template>
  <div
    v-if="!(hideOnSinglePage && pageCount <= 1)"
    class="common-pagination-wrapper"
  >
    <button
      :disabled="isFirstPage"
      class="btn btn-prev"
      @click="prev"
    >
      <CommonIcon icon="left" />
      上一页
    </button>
    <div class="pages">
      <template
        v-for="(item, index) in pages"
        :key="index"
      >
        <template v-if="item.type === 'backward'">
          <CommonPaginationForwardOrBackward
            v-model:currentPage="currentPage"
            :prev="true"
            :current="currentPage"
            :page-count="pageCount"
          />
        </template>
        <template v-else-if="item.type === 'forward'">
          <CommonPaginationForwardOrBackward
            v-model:currentPage="currentPage"
            :prev="false"
            :current="currentPage"
            :page-count="pageCount"
          />
        </template>
        <template v-else>
          <CommonPaginationItem
            v-model:currentPage="currentPage"
            :value="item.value"
          />
        </template>
      </template>
    </div>
    <button
      :disabled="isLastPage"
      class="btn btn-next"
      @click="next"
    >
      下一页
      <CommonIcon icon="right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PaginationReturn } from '~~/types/pagination'

type ItemValueType = 'page' | 'current' | 'backward' | 'forward'

type ItemType = {
  type: ItemValueType;
  value: number | null;
}

const props = withDefaults(defineProps<{
  pagination: PaginationReturn;
  hideOnSinglePage?: boolean;
}>(), {
  hideOnSinglePage: true
})

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  currentPage,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next
} = props.pagination

const pages = computed(() => {
  const pages: ItemType[] = []

  if (pageCount.value <= 7) {
    pages.push(...genPage(1, pageCount.value))
    return pages
  }

  if (currentPage.value <= 3) {
    pages.push(...genPage(1, 5))
    pages.push({
      type: 'forward',
      value: null
    })
    pages.push(...genPage(pageCount.value, pageCount.value))

    return pages
  }

  if (currentPage.value === 4) {
    pages.push(...genPage(1, 6))
    pages.push({
      type: 'forward',
      value: null
    })
    pages.push(...genPage(pageCount.value, pageCount.value))

    return pages
  }

  if (currentPage.value < pageCount.value - 3) {
    pages.push(...genPage(1, 1))
    pages.push({
      type: 'backward',
      value: null
    })
    pages.push(...genPage(currentPage.value - 2, currentPage.value + 2))
    pages.push({
      type: 'forward',
      value: null
    })
    pages.push(...genPage(pageCount.value, pageCount.value))
  }

  if (currentPage.value === pageCount.value - 3) {
    pages.push(...genPage(1, 1))
    pages.push({
      type: 'backward',
      value: null
    })
    pages.push(...genPage(currentPage.value - 2, pageCount.value))

    return pages
  }

  if (currentPage.value > pageCount.value - 3) {
    pages.push(...genPage(1, 1))
    pages.push({
      type: 'backward',
      value: null
    })
    pages.push(...genPage(pageCount.value - 4, pageCount.value))

    return pages
  }

  return pages
})

function genPage (start: number, end: number) {
  const pages: ItemType[] = []
  const max = Math.min(end, pageCount.value)
  const min = Math.max(1, start)
  for (let i = min; i <= max; i++) {
    pages.push({
      type: currentPage.value === i ? 'current' : 'page',
      value: i
    })
  }

  return pages
}
</script>
