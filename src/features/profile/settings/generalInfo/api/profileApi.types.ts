import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import { FormData as FormDataType } from '@/features/profile/settings/generalInfo/model/useFillGeneralForm'

export type UpdatedProfile = {
  photoData?: PhotoResult | undefined
  region: string
} & Omit<Required<FormDataType>, 'photoData'>

export type UserProfile = {
  avatars: Avatar[]
  createdAt: string
  id: number
} & UpdatedProfile

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
