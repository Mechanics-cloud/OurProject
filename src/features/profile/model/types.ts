type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type Foto = {
  id: number
  images: Images[]
}
type Item = {
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
export type ImageData = {
  items: Item[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
