import { PhotoFile } from '@/common'

export type UploadPhotoResponse = {
  images: UploadPhoto[]
}

type UploadPhoto = {
  uploadId: string
} & PhotoFile

export type UploadPost = {
  childrenMetadata: { uploadId: string }[]
  description: string
}

export type UploadPostResponse = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: UploadPhoto[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}
