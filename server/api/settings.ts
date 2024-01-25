const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(() => $fetch(`${runtimeConfig.public.api}/settings`))
