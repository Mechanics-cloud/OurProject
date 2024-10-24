import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'

export type UpdatedProfile = {
  photoData?: PhotoResult | undefined
  region: string
} & Omit<Required<FormData>, 'photoData'>

export type UserProfile = {
  avatars: Avatar[]
  createdAt: string
  id: number
} & Omit<UpdatedProfile, 'photoData'>

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type FormData = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}
