import * as React from 'react'
import { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'

import { Dialog, useModal } from '@/common'
import {
  AddPhotoModal,
  ClosePostCreatingModal,
  CropPhotoModal,
  FilterPhotoModal,
  PublicationModal,
  addPostStore,
} from '@/features/createPost'
import { PhotoEditorState } from '@/features/createPost/model/constants'
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

    const {
      isModalOpen: isModalExitOpen,
      onModalClose: onModalExitClose,
      openModal: openExitModal,
    } = useModal()

    const onClosePostCreating = () => {
      onModalExitClose()
      onClose()
    }

    const onPostUpload = () => {
      onClose()
      toast('Success')
      setIsNewDialog()
    }

    return (
      <>
        <Dialog
          onOpenChange={(!isNewDialog && openExitModal) || onClose}
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
            <PublicationModal onPostUpload={onPostUpload} />
          )}
        </Dialog>

        <ClosePostCreatingModal
          onClose={onModalExitClose}
          onCloseFull={onClosePostCreating}
          open={isModalExitOpen}
        />
      </>
    )
  }
)
