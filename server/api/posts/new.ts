import { getQuery } from 'h3'
const { API_BASE_URL } = useRuntimeConfig()

export default (req) => {
  const query = getQuery(req)
  return $fetch(`${API_BASE_URL}/posts/new`, {
    params: query
  })
}
