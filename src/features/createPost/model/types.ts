import { Area, Point } from 'react-easy-crop'

import { PhotoEditorState } from '@/features/createPost/model/constants'
import { PhotoResult } from '@/features/profile'

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export type PostPhoto = {
  aspect: number
  crop: Point
  croppedArea: Area
  croppedImgUrl: PhotoResult
  id: string
  originAspect: number
  url: string
  zoom?: number
}
