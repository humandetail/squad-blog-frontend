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
      <span class="iconfont icon-left" />
      上一页
    </button>
    <div class="pages">
      <CommonPaginationItem
        v-if="pageCount <= 7"
        v-model:currentPage="currentPage"
        :start="1"
        :end="pageCount"
      />
      <template v-else>
        <CommonPaginationItem
          v-model:currentPage="currentPage"
          :start="1"
          :end="1"
        />
        <CommonPaginationItem
          v-if="currentPage <= 3"
          v-model:currentPage="currentPage"
          :start="1"
          :end="1"
        />
        <CommonPaginationFirstOrLast
          v-else
          v-model:currentPage="currentPage"
          :prev="true"
          :page-count="pageCount"
        />
        <CommonPaginationItem
          v-model:currentPage="currentPage"
          :start="3"
          :end="pageCount - 2"
        />
        <CommonPaginationItem
          v-if="currentPage >= pageCount - 2"
          v-model:currentPage="currentPage"
          :start="pageCount - 1"
          :end="pageCount - 1"
        />
        <CommonPaginationFirstOrLast
          v-else
          v-model:currentPage="currentPage"
          :prev="false"
          :page-count="pageCount"
        />
        <CommonPaginationItem
          v-model:currentPage="currentPage"
          :start="pageCount"
          :end="pageCount"
        />
      </template>
    </div>
    <button
      :disabled="isLastPage"
      class="btn btn-next"
      @click="next"
    >
      下一页
      <span class="iconfont icon-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PaginationReturn } from '~~/types/pagination'

const props = withDefaults(defineProps<{
  pagination: PaginationReturn;
  hideOnSinglePage?: boolean;
}>(), {
  hideOnSinglePage: true
})

const {
  currentPage,
  // currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next
} = props.pagination
</script>

<style lang="scss" scoped>
.common-pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  ::v-deep(.btn) {
    cursor: pointer;
    font-size: .18rem;

    &.btn[disabled] {
      cursor: not-allowed;
      border-color: var(--border-color);
    }

    .iconfont {
      font-size: .24rem;
    }

    &:hover:not([disabled]) {
      color: var(--brand-color);
    }
  }

  .btn-prev,
  .btn-next {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
  }

  .pages {
    display: flex;
    align-items: center;

    ::v-deep(.btn) {
      width: .4rem;
      height: .4rem;
      margin: 0 .08rem;
      background-color: transparent;
      border: 1px solid var(--primary-text);

      &:hover:not([disabled]) {
        color: var(--brand-color);
        border-color: var(--brand-color);
      }

      &.current {
        background-color: var(--brand-color);
        border-color: var(--brand-color);
        color: var(--plain-color);
      }

      &.btn-first,
      &.btn-last {
        border: 0;
        border-color: var(--secondary-text);
        color: var(--secondary-text);

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

</style>
