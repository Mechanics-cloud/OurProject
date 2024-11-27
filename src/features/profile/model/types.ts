type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type Photo = {
  id: number
  images: Images[]
}
type ImageData = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: Images[]
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
