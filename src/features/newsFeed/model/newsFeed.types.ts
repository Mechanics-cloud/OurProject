import { BasicPost } from '@/common'

export type NewsFeedRoot = {
  items: BasicPost[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type NewsFeedQuery = {
  endCursorPostId: number
  pageNumber: number
  pageSize: number
}
