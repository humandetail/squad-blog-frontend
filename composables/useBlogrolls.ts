import { BlogrollsData } from '~~/types/response'

export default () => useState<BlogrollsData[] | null>('blogrolls', null)
