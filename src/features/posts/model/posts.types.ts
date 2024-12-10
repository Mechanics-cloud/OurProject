import { PhotoFile } from '@/common'

export type PostsLikes = {
  items: Likes[]
  pageSize: number
  totalCount: number
}

export type Likes = {
  avatars: PhotoFile[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type PostComments = {
  items: Comment[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: FromWhom
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type FromWhom = {
  avatars: PhotoFile[]
  id: number
  username: string
}
