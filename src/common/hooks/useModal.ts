import { useState } from 'react'

export const useModal = (onClose: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const onModalClose = () => {
    onClose()
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    onModalClose,
    openModal,
  }
}
