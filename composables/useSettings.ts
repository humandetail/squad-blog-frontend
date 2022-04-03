import { Settings } from '~~/types/response'

export default () => useState<Settings | null>('settings', null)
