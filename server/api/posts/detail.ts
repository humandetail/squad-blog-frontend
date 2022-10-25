import { getQuery, CompatibilityEvent } from 'h3'
import { FetchResponseType, PostDetail } from '~~/types/response'
const { API_BASE_URL } = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
  const params = getQuery(req)
  return $fetch<FetchResponseType<PostDetail>>(`${API_BASE_URL}/posts/${params.id}`)
}
