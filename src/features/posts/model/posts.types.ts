import { ImageFile, PagesInfo } from '@/common'

export type PostsLikes = {
  items: Likes[]
} & Pick<PagesInfo, 'pageSize' | 'totalCount'>

export type Likes = {
  avatars: ImageFile[]
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
  from: FromWhom
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type PostComments = {
  items: Comment[]
} & PagesInfo

export type FromWhom = {
  avatars: ImageFile[]
  id: number
  username: string
}
