import { BasicPost } from '@/common'

export type RequestQueries = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type PublicPostsDto = {
  items: PostDto[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type PostDto = {
  avatarWhoLikes: boolean
} & BasicPost
