import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Dialog } from '@/common'
import {
  AddPhotoModal,
  ClosePostCreatingModal,
  CropPhotoModal,
  FilterPhotoModal,
  PublicationModal,
} from '@/features/createPost'
import { PhotoEditorState } from '@/features/createPost/model/constants'
import { useNewPostDialog } from '@/features/createPost/model/useNewPostDialog'
import { DialogProps } from '@radix-ui/react-dialog'
import { observer } from 'mobx-react-lite'

type Props = {
  onClose: () => void
} & DialogProps &
  PropsWithChildren

export const NewPostDialog = observer(
  ({ onClose, onOpenChange, open, ...rest }: Props) => {
    const {
      currentState,
      isModalExitOpen,
      isNewDialog,
      onCloseAddPost,
      onClosePostCreating,
      onModalExitClose,
      onPostUpload,
    } = useNewPostDialog(onClose)

    return (
      <>
        <Dialog
          onOpenChange={onCloseAddPost()}
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
          onOpenChange={onModalExitClose}
          open={isModalExitOpen}
        />
      </>
    )
  }
)
