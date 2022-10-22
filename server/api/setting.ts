const { API_BASE_URL } = useRuntimeConfig()

export default () => $fetch(`${API_BASE_URL}/settings`)
