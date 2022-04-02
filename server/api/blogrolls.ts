import { publicConfig } from '#config'
const { API_BASE_URL } = publicConfig

export default () => $fetch(`${API_BASE_URL}/blogrolls`)
