import { BasicPost, UploadImage } from '@/common'

export type UploadPhotoResponse = {
  images: UploadImage[]
}

export type UploadPost = {
  childrenMetadata: { uploadId: string }[]
  description: string
}

export type UploadPostResponse = {
  avatarWhoLikes: boolean
} & BasicPost
