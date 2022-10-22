interface BaseResponseType {
  createdTime: Date;
  updatedTime: Date;
}
export type WebSiteStatusType = 0 | 1 | 2 | 3;

export type TagItem = {
  name: string;
  displayName: string;
}

export type CategoryItem = {
  name: string;
  displayName: string;
}

export interface FetchResponseType<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface PostLinkType {
  id: string;
  title: string;
}

export interface PageResponseType<T> {
  records: Array<T>,
  current: number;
  pageSize: number;
  total: number;
}

export interface Settings extends BaseResponseType {
  siteName: string;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  logoPic: string;
  status: WebSiteStatusType;
}

export interface PictureItem {
  name: string;
  url: string;
}

export interface SkillItem {
  description: string;
  icon: string;
  id: number;
  name: string;
}

export interface WorkItem {
  id: number;
  description: string;
  link: string;
  name: string;
  pictures: PictureItem[]
}

export interface PersonalItem {
  blog: string;
  email: string;
  github: string;
  intro: string;
  nickname: string;
  qq: string;
}

export interface AboutUsData extends PersonalItem {
  skills: SkillItem[];
  works: WorkItem[];
}

export interface BlogrollsData extends BaseResponseType {
  id: number;
  link: string;
  name: string;
  remarks: string;
}

export interface CategoriesData extends BaseResponseType {
  id: number;
  name: string;
  displayName: string;
}

export interface TagsData extends BaseResponseType {
  id: number;
  name: string;
  displayName: string;
  postCount: number | string;
}

export interface PostItem extends BaseResponseType {
  id: string;
  title: string;
  author: string;
  categoryDisplayName: string;
  categoryName: string;
  coverPic: string;
  recommendationIndex: number;
  summary: string;
  tags: Array<TagItem>
}

export interface PostData {
  author: string;
  category: CategoryItem;
  content: string;
  coverPic: string;
  createdTime: Date;
  id: string;
  recommendationIndex: number;
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
  source: string;
  summary: string;
  tags: TagItem[];
  template: string;
  title: string;
  viewCount: number;
  updatedTime: Date;
}

export interface PostDetail {
  post: PostData;
  next?: PostLinkType | null;
  prev?: PostLinkType | null;
}
