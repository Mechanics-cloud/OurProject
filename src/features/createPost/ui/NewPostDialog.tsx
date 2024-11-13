import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Dialog, useModal } from '@/common'
import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { PhotoEditorState } from '@/features/createPost/model/constants'
import { AddPhotoModal } from '@/features/createPost/ui/AddPhotoModal'
import { ClosePostCreatingModal } from '@/features/createPost/ui/ClosePostCreatingModal'
import { CropPhotoModal } from '@/features/createPost/ui/cropping/CropPhotoModal'
import { FilterPhotoModal } from '@/features/createPost/ui/filtering/FilterPhotoModal'
import { DialogProps } from '@radix-ui/react-dialog'
import { observer } from 'mobx-react-lite'

type Props = {
  onClose: () => void
} & DialogProps &
  PropsWithChildren

export const NewPostDialog = observer(
  ({ onClose, onOpenChange, open, ...rest }: Props) => {
    const currentState = addPostPhotoStore.currentStage
    const addIsNewDialog = addPostPhotoStore.addIsNewDialog
    const isNewDialog = addPostPhotoStore.isNewDialog

    const { isModalOpen, onModalClose, openModal } = useModal()

    const onOpenDialogChange = () => {
      openModal()
    }

    const onClosePostCreating = () => {
      onModalClose()
      onClose()
      addIsNewDialog()
    }

    return (
      <>
        <Dialog
          onOpenChange={onOpenDialogChange}
          open={open}
          {...rest}
        >
          {isNewDialog && <AddPhotoModal />}

          {!isNewDialog && currentState === PhotoEditorState.adding && (
            <AddPhotoModal />
          )}

          {!isNewDialog && currentState === PhotoEditorState.cropping && (
            <CropPhotoModal />
          )}

          {!isNewDialog && currentState === PhotoEditorState.filtering && (
            <FilterPhotoModal />
          )}
        </Dialog>
        <ClosePostCreatingModal
          onClose={onModalClose}
          onCloseFull={onClosePostCreating}
          open={isModalOpen}
        />
      </>
    )
  }
)
