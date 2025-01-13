import { useEffect, useState } from 'react'

import { createPostStore } from '@/features/createPost'

export const useScaleControllerPopover = (id: string) => {
  const [isOpen, setIsOpen] = useState(false)

  const onZoom = (zoom: number[]) => {
    createPostStore.images.getById(id)?.crop.changeZoom(zoom[0])
  }

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    window.document.addEventListener('wheel', onClose)

    return () => {
      window.document.removeEventListener('wheel', onClose)
    }
  })

  return { isOpen, onZoom, setIsOpen }
}
