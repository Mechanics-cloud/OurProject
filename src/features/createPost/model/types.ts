import { ElementType } from 'react'

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
