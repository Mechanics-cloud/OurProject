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
  filter: string
  id: string
  originAspect: number
  url: string
  zoom?: number
}

export type InstFilter = {
  name: string
  style: string
}

export type ClassicFiltersType =
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'saturate'
  | 'sepia'

export type ClassicSetting = {
  centered?: boolean
  field: ClassicFiltersType
  name: string
  // value: number
}

export type FiltersState = {
  [key in ClassicFiltersType]: number
}
