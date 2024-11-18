import { Area, Point } from 'react-easy-crop'

import { Nullable, PhotoResult } from '@/common'
import { PhotoEditorState } from '@/features/createPost/model/constants'

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export type PostPhoto = {
  aspect: number
  crop: Point
  cropDataSave: Nullable<Point>
  croppedArea: Area
  croppedImgData: PhotoResult
  id: string
  originAspect: number
  url: string
  zoom?: number
}
