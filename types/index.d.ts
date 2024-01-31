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
