import { useState } from 'react'

export const useModal = (onClose?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const onModalClose = () => {
    onClose && onClose()
    setIsModalOpen(false)
  }

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  return {
    isModalOpen,
    onModalClose,
    openModal,
    toggleModal,
  }
}
