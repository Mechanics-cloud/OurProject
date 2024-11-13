import { PhotoEditorStateType } from '@/features/createPost/model/types'

export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

export const mapNext = new Map<PhotoEditorStateType, PhotoEditorStateType>([
  [PhotoEditorState.adding, PhotoEditorState.cropping],
  [PhotoEditorState.cropping, PhotoEditorState.filtering],
  [PhotoEditorState.filtering, PhotoEditorState.publication],
])

export const mapPrev = new Map()
for (const [key, value] of mapNext) {
  mapPrev.set(value, key)
}

export const MaxPhotoCount = 10
