import { BasicPost, PagesInfo, UploadImage } from '@/common'

export type Photo = {
  id: number
  images: UploadImage[]
}

type ImageData = {
  avatarWhoLikes: string[]
} & BasicPost

export type ImagesData = {
  items: ImageData[]
} & PagesInfo
