import { CategoriesData } from '~~/types/response'

export default () => useState<CategoriesData[]>('categories', () => [])
