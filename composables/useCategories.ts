/*!
 * 分类列表
 */

import { CategoriesData } from '~~/types/response'

export default () => useState<CategoriesData[]>('categories', () => [])
