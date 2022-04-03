import { TagsData } from '~~/types/response'

export default () => useState<TagsData[]>('tags', () => [])
