import type { PageResponseType } from '~/types/response'

export default <Data>(
  api: (...args: any[]) => ReturnType<typeof useRequest<PageResponseType<Data>>>,
  current = 1,
  pageSize = 10,
  additionalOptions: Record<string, any> = {}
) => {
  const error = ref()
  const loading = ref(false)
  const data = ref<Data[]>([])

  const already = ref(false)

  const pagination = ref({
    current,
    pageSize,
    total: 0
  })

  const noMore = computed(() => {
    if (!already.value) {
      return false
    }

    const { current, pageSize, total } = pagination.value
    return total <= (current - 1) * pageSize
  })

  const request = async () => {
    loading.value = true

    try {
      const res = await api({
        current: pagination.value.current,
        pageSize: pagination.value.pageSize,
        ...additionalOptions
      })

      const {  records, total } = res.data.value ?? {}

      data.value = data.value.concat(records ?? [])
      Object.assign(pagination.value, {
        total: total ?? 0,
        current: pagination.value.current + 1,
        pageSize
      })
    } catch (err) {
      error.value = error

      if (pagination.value.current === 1) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Page Not Found',
          data: error.value
        })
      }
    } finally {
      already.value = true
      loading.value = false
    }
  }

  const refresh = () => {
    Object.assign(pagination.value, {
      total: 0,
      current: 1,
      pageSize
    })

    data.value = []
    already.value = false

    request()
  }

  return {
    data,
    loading,
    noMore,
    pagination,
    request,
    refresh
  }
}