import * as React from 'react'
import { ReactNode, useState } from 'react'

import {
  PhotoEditorContext,
  PhotoEditorState,
  PhotoEditorStateType,
} from '@/features/createPost/model/useStages'

export const PhotoEditorProvider = ({ children }: { children: ReactNode }) => {
  const [currentState, setCurrentState] = useState<PhotoEditorStateType>(
    PhotoEditorState.adding
  )
  const nextStage = () => {
    switch (currentState) {
      case 'ADDING':
        setCurrentState(PhotoEditorState.cropping)

        return
      case 'CROPPING':
        setCurrentState(PhotoEditorState.filtering)

        return
      case 'FILTERING':
        setCurrentState(PhotoEditorState.publication)

        return
      default:
        return
    }
  }

  const prevStage = () => {
    switch (currentState) {
      case 'CROPPING':
        setCurrentState(PhotoEditorState.adding)

        return
      case 'FILTERING':
        setCurrentState(PhotoEditorState.cropping)

        return
      case 'PUBLICATION':
        setCurrentState(PhotoEditorState.filtering)

        return
      default:
        return
    }
  }

  const contextValue = {
    currentState,
    nextStage,
    prevStage,
    setCurrentState,
  }

  return (
    <PhotoEditorContext.Provider value={contextValue}>
      {children}
    </PhotoEditorContext.Provider>
  )
}
