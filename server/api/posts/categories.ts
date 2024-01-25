const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((e) => {
  const { name, ...query } = getQuery(e)
  return $fetch(`${runtimeConfig.public.api}/categories/${name}/posts`, {
    params: {
      ...query
    }
  })
})
