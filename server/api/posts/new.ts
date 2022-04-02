import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { publicConfig } from '#config'
const { API_BASE_URL } = publicConfig

export default (req: IncomingMessage) => {
  const query = useQuery(req)
  return $fetch(`${API_BASE_URL}/posts/new`, {
    params: query
  })
}
