import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import { addImageCheck, addPostStore } from '@/features/createPost'

export const useAddImageModal = () => {
  const { t } = useTranslation()

  const onImageDrop = useCallback(
    async (files: File[]) => {
      try {
        addPostStore.continueDialog()
        addPostStore.resetData()
        await addImageCheck(
          files,
          addPostStore.images.count,
          t,
          addPostStore.addImage
        )
        await addPostStore.nextStage()
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
    [t]
  )

  const dropzoneOptions = useMemo(
    () => ({
      accept: {
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
      },
      multiple: true,
      onDrop: onImageDrop,
    }),
    [onImageDrop]
  )

  const { getInputProps, getRootProps, isDragActive } =
    useDropzone(dropzoneOptions)

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    t,
  }
}
