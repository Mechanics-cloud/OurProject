import { useModal } from '@/common'
import { generalStore } from '@/core/store'
import { addPostStore } from '@/features/createPost'

export const useNewPostDialog = (onClose: () => void) => {
  const currentState = addPostStore.currentStage
  const isNewDialog = addPostStore.isNewDialog
  const {
    isModalOpen: isModalExitOpen,
    onModalClose: onModalExitClose,
    openModal: openExitModal,
  } = useModal()

  const onClosePostCreating = () => {
    onModalExitClose()
    onClose()
    addPostStore.startNewDialog()
  }

  const onPostUpload = () => {
    onClose()
    addPostStore.startNewDialog()
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
