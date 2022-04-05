export type BreadcrumbRoute = {
  name: string;
  path?: string;
  icon?: string;
  children?: BreadcrumbRoute[]
}

export type BreadcrumbDivider = '/' | '|' | '>'

export type AsideModules = 'recommended' | 'tags';
