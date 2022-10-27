import { AboutUsData, BlogrollsData, CategoriesData, PageResponseType, PostDetail, PostItem, Settings, TagsData } from '~~/types/response'

const PREFIX = '/api'

/**
 * 获取网站设置
 */
export const getSettings = () => useRequest<Settings>(`${PREFIX}/settings`, { key: 'SETTINGS' })

/**
 * 获取关于我们
 */
export const getAboutUs = () => useRequest<AboutUsData>(`${PREFIX}/aboutUs`, { key: 'ABOUNT_US' })

/**
 * 获取友情链接列表
 */
export const getBlogrolls = () => useRequest<PageResponseType<BlogrollsData>>(`${PREFIX}/blogrolls`, { key: 'BLOGROLLS' })

/**
 * 获取文章分类列表
 */
export const getCategories = () => useRequest<PageResponseType<CategoriesData>>(`${PREFIX}/categories`, { key: 'CATEGORIES' })

/**
 * 获取文章标签列表
 */
export const getTags = () => useRequest<PageResponseType<TagsData>>(`${PREFIX}/tags`, { key: 'TAGS' })

/**
 * 搜索文章
 */
export const getPostsByKeywods = ({
  keyword,
  current,
  pageSize
}: {
  keyword: string
  current: number
  pageSize: number
}) => useRequest<PageResponseType<PostItem>>(`${PREFIX}/posts/search`, {
  key: `POSTS_SEARCH_${keyword}_${current}_${pageSize}`,
  params: {
    keyword,
    current,
    pageSize
  }
})

/**
 * 通过分类名称获取文章列表
 */
export const getPostByCategoryName = ({
  name,
  current,
  pageSize
}: {
  name: string
  current: number
  pageSize: number
}) => useRequest<PageResponseType<PostItem>>(`${PREFIX}/posts/categories`, {
  key: `POSTS_CATEGORIES_${name}_${current}_${pageSize}`,
  params: {
    name,
    current,
    pageSize
  }
})

/**
 * 通过标签名称获取文章列表
 */
export const getPostByTagName = ({
  name,
  current,
  pageSize
}: {
  name: string
  current: number
  pageSize: number
}) => useRequest<PageResponseType<PostItem>>(`${PREFIX}/posts/tags`, {
  key: `POSTS_TAGS_${name}_${current}_${pageSize}`,
  params: {
    name,
    current,
    pageSize
  }
})

/**
 * 获取推荐文章列表
 */
export const getRecommendedPosts = (current: number, pageSize: number) => useRequest<PageResponseType<PostItem>>(`${PREFIX}/posts/recommended`, {
  key: `POSTS_RECOMMENDED_${current}_${pageSize}`,
  params: {
    current,
    pageSize
  }
})

/**
 * 获取最新文章列表
 */
export const getNewPosts = () => useRequest<PageResponseType<PostItem>>(`${PREFIX}/posts/new`, { key: 'POSTS_NEW' })

/**
 * 获取文章详情
 */
export const getPostDetail = (id: string) => useRequest<PostDetail>(`${PREFIX}/posts/detail`, {
  key: `POSTS_DETAIL_${id}`,
  params: { id }
})
