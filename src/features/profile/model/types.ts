import { BasicPost, PagesInfo } from '@/common'

import { PublicProfile } from '../settings'

export type ProfileData = {
  postsData: ImagesData
  userProfile: PublicProfile
}

type ImageData = {
  avatarWhoLikes: string[]
} & BasicPost

export type ImagesData = {
  items: ImageData[]
  totalUsers: number
} & Omit<PagesInfo, 'pagesCount'>
