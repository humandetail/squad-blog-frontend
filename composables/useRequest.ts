import type { NitroFetchRequest } from 'nitropack'
import type { FetchResponseType } from '~/types/response'

export default async <R = unknown>(request: NitroFetchRequest, opts: { key?: string, [K: string]: any }) => {
  const { pending, data, error, refresh } = await useFetch<FetchResponseType>(request, opts)

  if (error.value || data.value?.code !== 200) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      data: error.value
    })
  }

  return {
    pending,
    data: ref<R>(data.value.data),
    refresh
  }
}