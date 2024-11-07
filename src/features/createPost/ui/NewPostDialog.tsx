import * as React from 'react'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

import { Dialog, Nullable } from '@/common'
import { PhotoEditorProvider } from '@/features/createPost/model/PhotoEditorProvider'
import {
  PhotoEditorState,
  PhotoEditorStateType,
  useStages,
} from '@/features/createPost/model/useStages'
import { AddPhotoModal } from '@/features/createPost/ui/AddPhotoModal'
import { CropPhotoModal } from '@/features/createPost/ui/cropping/CropPhotoModal'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onClose: () => void
} & DialogProps &
  PropsWithChildren

export const PrevNextContext = createContext<
  | {
      nextStage: () => void
      prevStage: () => void
    }
  | undefined
>(undefined)

export const NewPostDialog = ({
  onClose,
  onOpenChange,
  open,
  ...rest
}: Props) => {
  const { currentState, setCurrentState } = useStages()
  const [photo, setPhoto] = useState<Nullable<string>>(null)

  const handleClose = () => {
    setCurrentState(PhotoEditorState.adding)
    setPhoto(null)
    onClose()
  }

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
      {...rest}
    >
      {currentState === PhotoEditorState.adding && (
        <AddPhotoModal
          changeState={() => {
            setCurrentState(PhotoEditorState.cropping)
          }}
          setPhoto={setPhoto}
          title={'Add photo'}
        />
      )}

      {currentState === PhotoEditorState.cropping && photo && (
        <CropPhotoModal
          changeState={() => {
            setCurrentState(PhotoEditorState.publication)
          }}
          photo={photo}
          setPhoto={setPhoto}
        />
      )}
    </Dialog>
  )
}
