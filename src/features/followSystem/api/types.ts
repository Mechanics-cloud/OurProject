import { ImageFile, Nullable, PagesInfo } from '@/common'
import { Likes } from '@/features/posts'

export type InfoFollowingUser = {
  avatars: ImageFile[]
} & Omit<Likes, 'avatars'>

export type DataFollowingUsers = {
  items: InfoFollowingUser[]
  nextCursor: Nullable<number>
  prevCursor: Nullable<number>
} & PagesInfo
