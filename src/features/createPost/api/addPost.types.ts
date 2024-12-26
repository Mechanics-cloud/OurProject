import { BasicPost, UploadImage } from '@/common'

export type UploadImagesResponse = {
  images: UploadImage[]
}

export type UploadPost = {
  childrenMetadata: { uploadId: string }[]
  description: string
}

export type UploadPostResponse = {
  avatarWhoLikes: boolean
} & BasicPost
