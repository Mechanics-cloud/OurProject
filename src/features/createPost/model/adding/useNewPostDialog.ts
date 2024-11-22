import { useModal } from '@/common'
import { generalStore } from '@/core/store'
import { addPostStore } from '@/features/createPost'

export const useNewPostDialog = (onClose: () => void) => {
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
    setIsNewDialog()
  }

  const onPostUpload = () => {
    onClose()
    setIsNewDialog()
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
