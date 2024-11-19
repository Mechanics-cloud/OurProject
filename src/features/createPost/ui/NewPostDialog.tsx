import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Dialog, useModal } from '@/common'
import {
  AddPhotoModal,
  ClosePostCreatingModal,
  CropPhotoModal,
  FilterPhotoModal,
  PhotoEditorState,
  PublicationModal,
  addPostStore,
} from '@/features/createPost'
import { DialogProps } from '@radix-ui/react-dialog'
import { observer } from 'mobx-react-lite'

type Props = {
  onClose: () => void
} & DialogProps &
  PropsWithChildren

export const NewPostDialog = observer(
  ({ onClose, onOpenChange, open, ...rest }: Props) => {
    const currentState = addPostStore.currentStage
    const setIsNewDialog = addPostStore.startNewDialog
    const isNewDialog = addPostStore.isNewDialog

    const { isModalOpen, onModalClose, openModal } = useModal()

    const onClosePostCreating = () => {
      onModalClose()
      onClose()
      setIsNewDialog()
    }

    return (
      <>
        <Dialog
          onOpenChange={(!isNewDialog && openModal) || onClose}
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

          {!isNewDialog && currentState === PhotoEditorState.publication && (
            <PublicationModal />
          )}
        </Dialog>
        <ClosePostCreatingModal
          onClose={onModalClose}
          onCloseFull={onClosePostCreating}
          onOpenChange={onModalClose}
          open={isModalOpen}
        />
      </>
    )
  }
)