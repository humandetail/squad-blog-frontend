import { PaginationOptions, PaginationReturn } from '~~/types/pagination'

export default (opts: PaginationOptions): PaginationReturn => {
  const page = ref(Math.max(opts.page, 1))
  const pageSize = ref(opts.pageSize)
  const total = ref(0)

  const pageCount = computed(() => Math.ceil(total.value / pageSize.value))

  const isFirstPage = computed(() => page.value === 1)
  const isLastPage = computed(() => page.value === pageCount.value)

  const prev = () => {
    page.value = Math.max(1, page.value - 1)
  }

  const next = () => {
    page.value = Math.min(pageCount.value, page.value + 1)
  }

  watch(() => [page.value, pageSize.value], () => {
    opts.onPageChange({ currentPage: page.value, currentPageSize: pageSize.value })
  }, { deep: true })

  return {
    currentPage: page,
    currentPageSize: pageSize,
    total,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next
  }
}
