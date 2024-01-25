const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((e) => {
  const params = getQuery(e)
  return $fetch(`${runtimeConfig.public.api}/posts/${params.id}`)
})
