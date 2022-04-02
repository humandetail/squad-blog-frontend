import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { publicConfig } from '#config'
import { FetchResponseType, PostData } from '~~/types/response'
const { API_BASE_URL } = publicConfig

export default (req: IncomingMessage) => {
  const params = useQuery(req)
  return $fetch<FetchResponseType<PostData>>(`${API_BASE_URL}/posts/${params.id}`)
}
