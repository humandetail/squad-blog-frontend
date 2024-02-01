import type { RouteLocation } from 'vue-router'

export interface ArticleWidget {
  value: string | number
  route?: RouteLocation
  icon?: string
  color?: string
}

export interface ArticleTag {
  value: string
  route: RouteLocation
}

export interface ArticleCover {
  route: RouteLocation
  src: string
  alt?: string
}

export interface Breadcrumb {
  value: string
  icon?: string
  route?: RouteLocation
}
