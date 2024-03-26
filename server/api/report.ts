const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((req) => {
  const query = getQuery(req)
  return $fetch(`${runtimeConfig.public.api}/report`, {
    params: query
  })
})
