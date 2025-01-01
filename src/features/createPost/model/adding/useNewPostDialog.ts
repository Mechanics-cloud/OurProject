import { useModal } from '@/common'
import { generalStore } from '@/core/store'
import { createPostStore } from '@/features/createPost'

export const useNewPostDialog = (onClose: () => void) => {
  const currentState = createPostStore.currentStage
  const isNewDialog = createPostStore.isNewDialog
  const {
    isModalOpen: isModalExitOpen,
    onModalClose: onModalExitClose,
    openModal: openExitModal,
  } = useModal()

  const onClosePostCreating = () => {
    onModalExitClose()
    onClose()
    createPostStore.startNewDialog()
  }

  const onPostUpload = () => {
    onClose()
    createPostStore.startNewDialog()
  }

  const onCloseAddPost = () => {
    if (generalStore.isLoading) {
      return
    }

    return (!isNewDialog && openExitModal) || onClose
  }

  return {
    currentState,
    isModalExitOpen,
    isNewDialog,
    onCloseAddPost,
    onClosePostCreating,
    onModalExitClose,
    onPostUpload,
  }
}
