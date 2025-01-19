import { FullName, Image, Nullable, SortDirection, StaticImage } from '@/common'

export type SortedResponse = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

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

export type PostComments = { items: Comment[] } & SortedResponse
export type PostsLikes = {
  isLiked: boolean
  items: Likes[]
  nextCursor: Nullable<number>
  prevCursor: Nullable<number>
} & SortedResponse

export type From = {
  avatars: StaticImage[]
  id: number
  username: string
}

export type Post = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: FullName
  ownerId: number
  updatedAt: string
  userName: string
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
  post: Nullable<Post>
}
