import { StaticImageData } from 'next/image'

export type PostsLikes = {
  items: Likes[]
  pageSize: number
  totalCount: number
}

export type Likes = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: StaticImageData | string
  width: number
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
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type From = {
  avatars: Avatar[]
  id: number
  username: string
}
