import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Dialog } from '@/common'
import {
  AddPhotoModal,
  ClosePostCreatingModal,
  CropPhotoModal,
  FilterPhotoModal,
  PublicationModal,
  useNewPostDialog,
} from '@/features/createPost'
import { PostEditorState } from '@/features/createPost/model/constants'
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

          {!isNewDialog && currentState === PostEditorState.adding && (
            <AddPhotoModal />
          )}

          {!isNewDialog && currentState === PostEditorState.cropping && (
            <CropPhotoModal />
          )}

          {!isNewDialog && currentState === PostEditorState.filtering && (
            <FilterPhotoModal />
          )}

          {!isNewDialog && currentState === PostEditorState.publication && (
            <PublicationModal onPostUpload={onPostUpload} />
          )}
        </Dialog>

        <ClosePostCreatingModal
          onBack={onModalExitClose}
          onClose={onClosePostCreating}
          onOpenChange={onModalExitClose}
          open={isModalExitOpen}
        />
      </>
    )
  }
)
