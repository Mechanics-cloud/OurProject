import { FullName, ImageFile, PhotoResult } from '@/common'

export type UpdatedProfile = {
  photoData?: PhotoResult
  region: string
} & Omit<Required<UserInfo>, 'photoData'>

export type UserProfile = {
  avatars: ImageFile[]
  createdAt: string
  id: number
} & Omit<UpdatedProfile, 'photoData'>

export type UserInfo = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  userName: string
} & FullName
