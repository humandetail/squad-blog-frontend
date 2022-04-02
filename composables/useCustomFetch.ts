/**
 * useFetch interceptor
 */

import { FetchRequest, FetchOptions } from 'ohmyfetch'
import { FetchResponseType } from '~~/types/response'

const useCustomFetch = async <T = any>(request: FetchRequest, opts: FetchOptions = {}) => {
  const { data, pending, refresh, error } = await useFetch<FetchResponseType>(request, {
    ...opts,
    pick: ['code', 'data']
  })

  if (error.value) {
    throw new Error('404')
  }

  if (data.value.code !== 200) {
    throw new Error('404')
  }

  return {
    data: ref<T>(data.value.data),
    pending,
    refresh
  }
}

export default useCustomFetch
