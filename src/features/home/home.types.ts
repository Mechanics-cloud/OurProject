import { StaticImageData } from 'next/image'

export interface HomePageRootInterface {
  items: [] | Item[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export interface Item {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export interface Owner {
  firstName: string
  lastName: string
}

export interface Image {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export interface HomePageQuery {
  endCursorPostId: number
  pageNumber: number
  pageSize: number
}
