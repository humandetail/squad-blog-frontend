import type { Settings } from '~/types/response'

export const useSettings = () => useState<Settings | null>('settings', () => null)
