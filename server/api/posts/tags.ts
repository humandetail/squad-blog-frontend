import { getQuery } from 'h3'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((req) => {
  const { name, ...query } = getQuery(req)
  return $fetch(`${runtimeConfig.public.api}/tags/${name}/posts`, {
    params: {
      ...query
    }
  })
})
