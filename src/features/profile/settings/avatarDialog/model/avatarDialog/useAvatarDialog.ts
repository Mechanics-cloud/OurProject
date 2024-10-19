import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { ModalHandler } from '../types'

export const useAvatarDialog = (modalHandler: ModalHandler) => {
  const [photo, setPhoto] = useState<null | string>(null)
  const [error, setError] = useState('')

  const photoEditorRef = useRef<AvatarEditor | null>(null)

  const handleSave = () => {
    if (photoEditorRef.current) {
      const canvas = photoEditorRef.current.getImageScaledToCanvas()
      const context = canvas.getContext('2d')

      if (context) {
        const size = Math.min(canvas.width, canvas.height)
        const outputCanvas = document.createElement('canvas')

        outputCanvas.width = size
        outputCanvas.height = size
        const outputContext = outputCanvas.getContext('2d')

        if (outputContext) {
          outputContext.beginPath()
          outputContext.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true)
          outputContext.clip()

          outputContext.drawImage(
            canvas,
            (canvas.width - size) / 2,
            (canvas.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          )
          const finalPhoto = outputCanvas.toDataURL('image/png')

          outputCanvas.toBlob((blob) => {
            if (blob) {
              modalHandler({
                error: null,
                photo: finalPhoto,
                photoForServer: blob,
              })
            } else {
              modalHandler({
                error: 'Blob error',
                photo: null,
                photoForServer: null,
              })
            }
          }, 'image/png')
        }
      }
    }
  }

  return {
    error,
    handleSave,
    photo,
    photoEditorRef,
    setError,
    setPhoto,
  }
}
