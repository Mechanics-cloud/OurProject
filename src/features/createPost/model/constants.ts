export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]
