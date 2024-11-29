type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type Photo = {
  id: number
  images: Image[]
}
type ImageData = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}
export type ImagesData = {
  items: ImageData[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
