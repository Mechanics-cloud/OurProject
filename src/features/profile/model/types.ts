import { FullName, Nullable, PagesInfo, UploadImage } from '@/common'

export type Photo = {
  id: number
  images: UploadImage[]
}

type ImageData = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: UploadImage[]
  isLiked: boolean
  likesCount: number
  location: Nullable<string>
  owner: FullName
  ownerId: number
  updatedAt: string
  userName: string
}

export type ImagesData = {
  items: ImageData[]
} & PagesInfo
