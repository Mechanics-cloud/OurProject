import { Area, Point } from 'react-easy-crop'

import { PhotoResult } from '@/common'
import { PhotoEditorState } from '@/features/createPost/model/constants'

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export type PostPhoto = {
  aspect: number
  crop: Point
  croppedArea: Area
  croppedImgData: PhotoResult
  id: string
  originAspect: number
  url: string
  zoom?: number
}
