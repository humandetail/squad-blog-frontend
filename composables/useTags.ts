/*!
 * 标签列表
 */
import { TagsData } from '~~/types/response'

export default () => useState<TagsData[]>('tags', () => [])
