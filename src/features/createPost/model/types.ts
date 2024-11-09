import { Area, Point } from 'react-easy-crop'

import { Nullable } from '@/common'
import { PhotoEditorState } from '@/features/createPost/model/constants'

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export type PostPhoto = {
  aspect: number
  crop?: Area | Point | undefined
  id: string
  originAspect: number
  url: Nullable<string>
  zoom?: number
}
