import { ImageFile, Nullable } from '@/common'

export type InfoFollowingUser = {
  avatars: ImageFile[]
  createdAt: string
  id: number
  userId: number
  userName: string
}

export type DataFollowingUsers = {
  items: InfoFollowingUser[]
  nextCursor: Nullable<number>
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
