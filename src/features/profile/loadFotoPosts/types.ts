interface Images {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export interface Foto {
  id: number
  images: Array<Images>
}
interface Item {
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
export interface Data {
  items: Item[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
