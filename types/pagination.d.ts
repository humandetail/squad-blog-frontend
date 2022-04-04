import type { Ref, ComputedRef } from 'vue'

export type PaginationChangeType = {
  currentPage: number;
  currentPageSize: number;
}

export type PaginationOptions = {
  page: number;
  pageSize: number;
  onPageChange: (arg: PaginationChangeType) => void;
  onPageSizeChange: (arg: PaginationChangeType) => void;
}

export type PaginationReturn = {
  currentPage: Ref<number>;
  currentPageSize: Ref<number>;
  total: Ref<number>;
  pageCount: ComputedRef<number>;
  isFirstPage: ComputedRef<boolean>;
  isLastPage: ComputedRef<boolean>;
  prev: () => void;
  next: () => void;
}
