import { createContext, useContext } from 'react'

export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

type PhotoEditorContextType = {
  currentState: PhotoEditorStateType
  nextStage: () => void
  prevStage: () => void
  setCurrentState: (value: PhotoEditorStateType) => void
}

export const PhotoEditorContext = createContext<
  PhotoEditorContextType | undefined
>(undefined)

export const useStages = () => {
  const context = useContext(PhotoEditorContext)

  if (!context) {
    throw new Error('You forgot context provider!')
  }

  return context
}
