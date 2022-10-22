import { getQuery } from 'h3'
const { API_BASE_URL } = useRuntimeConfig()

export default (req) => {
  const { name, ...query } = getQuery(req)
  return $fetch(`${API_BASE_URL}/tags/${name}/posts`, {
    params: {
      ...query
    }
  })
}
