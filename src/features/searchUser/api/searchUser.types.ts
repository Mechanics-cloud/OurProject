import { BaseData, FullName, ImageFile, PagesInfo } from '@/common'

export type GetUserByNameArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  signal?: AbortSignal
}

export type UserItemInfoDTO = { avatars: ImageFile[] } & FullName &
  Omit<BaseData, 'ownerId'>

export type UsersInfoDTO = {
  items: UserItemInfoDTO[]
  nextCursor: number
  prevCursor: number
} & PagesInfo
