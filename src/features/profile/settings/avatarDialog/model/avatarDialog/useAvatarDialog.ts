import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { toast } from 'react-toastify'

import { Nullable, useTranslation } from '@/common'

import { ModalPhotoSaveHandler } from '../types'

export const useAvatarDialog = (onModalPhotoSave: ModalPhotoSaveHandler) => {
  const [photo, setPhoto] = useState<Nullable<string>>(null)
  const [error, setError] = useState<Nullable<string>>(null)
  const { t } = useTranslation()

  const photoEditorRef = useRef<Nullable<AvatarEditor>>(null)

  const onPhotoSave = () => {
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
              onModalPhotoSave({
                photoFile: blob,
                photoUrl: finalPhoto,
              })
            } else {
              onModalPhotoSave({
                photoFile: null,
                photoUrl: null,
              })
              toast.error(t.basic.errors.unknown)
            }
          }, 'image/png')
        }
      }
    }
  }

  const onModalOpenChange = () => {
    setPhoto(null)
    setError('')
  }

  return {
    error,
    onModalOpenChange,
    onPhotoSave,
    photo,
    photoEditorRef,
    setError,
    setPhoto,
    t,
  }
}
