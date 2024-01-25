const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((e) => {
  const query = getQuery(e)
  return $fetch(`${runtimeConfig.public.api}/posts/search`, {
    params: query
  })
})
