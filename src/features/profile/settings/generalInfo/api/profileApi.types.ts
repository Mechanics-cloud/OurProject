import { PhotoResult } from '@/common'

export type UpdatedProfile = {
  photoData?: PhotoResult
  region: string
} & Omit<Required<UserInfo>, 'photoData'>

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

export type UserInfo = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}

export type UserMetadata = {
  followers: number
  following: number
  publications: number
}

export type PublicProfile = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userMetadata: UserMetadata
  userName: string
}
