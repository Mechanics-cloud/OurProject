import {
  BasicPost,
  Nullable,
  PagesInfo,
  SortDirection,
  StaticImage,
} from '@/common'

export type Likes = {
  avatars: StaticImage[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type PostComments = { items: Comment[] } & PagesInfo
export type PostsLikes = {
  isLiked: boolean
  items: Likes[]
  nextCursor: Nullable<number>
  prevCursor: Nullable<number>
} & PagesInfo

export type From = {
  avatars: StaticImage[]
  id: number
  username: string
}

export type PostInfoParamsRequest = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type PublicPostInfo = {
  comments: Nullable<PostComments>
  post: Nullable<BasicPost>
}
