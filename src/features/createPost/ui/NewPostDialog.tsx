import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Dialog } from '@/common'
import {
  AddImageModal,
  ClosePostCreatingModal,
  CropImageModal,
  FilterImageModal,
  PublicationModal,
  useNewPostDialog,
} from '@/features/createPost'
import { PostCreationState } from '@/features/createPost/model/constants'
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
          {isNewDialog ? (
            <AddImageModal />
          ) : (
            <>
              {currentState === PostCreationState.adding && <AddImageModal />}
              {currentState === PostCreationState.cropping && (
                <CropImageModal />
              )}
              {currentState === PostCreationState.filtering && (
                <FilterImageModal />
              )}
              {currentState === PostCreationState.publication && (
                <PublicationModal onPostUpload={onPostUpload} />
              )}
            </>
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
