import { ElementType } from 'react'
import { Area, Point } from 'react-easy-crop'

import { Nullable, PhotoResult } from '@/common'

export type PostPhoto = {
  aspect: number
  classicFilter: string
  classicFilterSettings: FiltersState
  crop: Point
  cropDataSave: Nullable<Point>
  croppedArea: Area
  croppedImgData: PhotoResult
  id: string
  instFilter: string
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
}

export type FiltersState = {
  [key in ClassicFiltersType]: number
}

export type ScaleSizeButtonType = {
  aspect: number
  icon: ElementType
  title: string
}
