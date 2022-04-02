import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { publicConfig } from '#config'
const { API_BASE_URL } = publicConfig

export default (req: IncomingMessage) => {
  const params = useQuery(req)
  return $fetch(`${API_BASE_URL}/categories/${params.name}/posts`)
}
