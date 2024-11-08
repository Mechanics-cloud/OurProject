import { Point } from 'react-easy-crop'

import { Nullable } from '@/common'

export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export type PostPhoto = {
  aspect: number
  crop?: Point | undefined
  id: string
  originAspect: number
  // originalDimension: Dimension
  url: Nullable<string>
  zoom?: number
}

export type Dimension = {
  height: number
  width: number
}
