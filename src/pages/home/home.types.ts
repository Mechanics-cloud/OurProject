import { StaticImageData } from 'next/image'

export interface RootInterface {
  items: [] | Item[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export interface Item {
  avatarOwner: StaticImageData | string //todo StaticImageData для теста (данные взял из обьекта) удалить
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
  url: StaticImageData | string //todo StaticImageData для теста (данные взял из обьекта) удалить
  width: number
}
export interface homeData {
  endCursorPostId: number
  pageNumber: number
  pageSize: number
}
