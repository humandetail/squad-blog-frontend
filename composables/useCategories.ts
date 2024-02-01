import type { CategoriesData } from '~/types/response'

export default () => useState<CategoriesData[]>('categories', () => [])
