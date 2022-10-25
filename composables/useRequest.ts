import { FetchRequest, FetchOptions } from 'ohmyfetch'
import { FetchResponseType } from '~~/types/response'

export default async <T = any>(request: FetchRequest, opts: FetchOptions & { key?: string } = {}) => {
  const { pending, data, refresh, error } = await useFetch<FetchResponseType>(request, {
    ...opts,
    pick: ['code', 'data']
  })

  if (error.value || data.value.code !== 200) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      data: error.value
    })
  }

  return {
    pending,
    data: ref<T>(data.value.data),
    refresh
  }
}
