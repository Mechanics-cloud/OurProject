import { BasicPost, PagesInfo } from '@/common'

export type NewsFeedRoot = {
  items: BasicPost[]
  nextCursor: number
  prevCursor: number
} & PagesInfo

export type NewsFeedQuery = {
  endCursorPostId: number
  pageNumber: number
} & Pick<PagesInfo, 'pageSize'>
