import { PublicProfile } from '../settings'

export type ProfileData = {
  postsData: PostData
  userProfile: PublicProfile
}

type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type FullName = {
  firstName: string
  lastName: string
}

type PostItem = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: FullName
  ownerId: number
  updatedAt: string
  userName: string
}

export type PostData = {
  items: PostItem[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
