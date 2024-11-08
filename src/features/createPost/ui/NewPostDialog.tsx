import * as React from 'react'
import { PropsWithChildren, createContext, useState } from 'react'

import { Dialog, Nullable } from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostStore'
import { PhotoEditorState } from '@/features/createPost/model/constants'
import { AddPhotoModal } from '@/features/createPost/ui/AddPhotoModal'
import { CropPhotoModal } from '@/features/createPost/ui/cropping/CropPhotoModal'
import { FilterPhotoModal } from '@/features/createPost/ui/filtering/FilterPhotoModal'
import { DialogProps } from '@radix-ui/react-dialog'
import { observer } from 'mobx-react-lite'

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

export const NewPostDialog = observer(
  ({ onClose, onOpenChange, open, ...rest }: Props) => {
    const currentState = addPostStore.currentStage
    const setCurrentState = addPostStore.changeStage
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
          <AddPhotoModal setPhoto={setPhoto} />
        )}

        {currentState === PhotoEditorState.cropping && photo && (
          <CropPhotoModal
            photo={photo}
            setPhoto={setPhoto}
          />
        )}

        {currentState === PhotoEditorState.filtering && photo && (
          <FilterPhotoModal
            photo={photo}
            setPhoto={setPhoto}
          />
        )}
      </Dialog>
    )
  }
)
