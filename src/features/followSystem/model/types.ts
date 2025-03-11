import { ImageFile, Nullable } from '@/common'

export type infoFollowingUser = {
  avatars: ImageFile[]
  createdAt: string
  id: number
  userId: number
  userName: string
}

export type dataFollowingUsers = {
  items: infoFollowingUser[]
  nextCursor: Nullable<number>
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
