const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(() => {
  return $fetch(`${runtimeConfig.public.api}/tags`)
})
