import { useEffect, useState } from 'react'

import { addPostStore } from '@/features/createPost'

export const useScaleControllerPopover = (id: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const changeZoom = addPostStore.addZoom

  const onZoom = (zoom: number[]) => {
    changeZoom(id, zoom[0])
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
