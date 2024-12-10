import { HttpStatusCode } from 'axios'
import { StaticImageData } from 'next/image'

export type Nullable<T> = T | null

export type ErrorMessage = {
  field: string
  message: string
}

export type ErrorResponse = {
  error: string
  messages: ErrorMessage[]
  statusCode: HttpStatusCode
}

export type PhotoResult = {
  photoFile: Nullable<Blob>
  photoUrl: Nullable<string>
}

export type ImageUrl = StaticImageData | string

export type ImageFile = {
  createdAt: string
  fileSize: number
  height: number
  url: ImageUrl
  width: number
}

export type UploadImage = {
  uploadId: string
} & ImageFile

export type FullName = {
  firstName: string
  lastName: string
}

export type BasicPost = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: UploadImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: FullName
  ownerId: number
  updatedAt: string
  userName: string
}

export type PagesInfo = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
