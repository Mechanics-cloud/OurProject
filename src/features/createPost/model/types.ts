import { ElementType } from 'react'
import { Area, Point } from 'react-easy-crop'

import { Nullable, PhotoResult } from '@/common'

export type PostPhoto = {
  aspect: number
  crop: Point
  cropDataSave: Nullable<Point>
  croppedArea: Area
  filter: string
  filterSettings: FiltersState
  id: string
  imgUrlToShow: string
  originAspect: number
  preparedImgData: PhotoResult
  url: string
  zoom?: number
}

export type InstFilter = {
  name: string
  style: FiltersState
}

export type ClassicFiltersType =
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'hue-rotate'
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
