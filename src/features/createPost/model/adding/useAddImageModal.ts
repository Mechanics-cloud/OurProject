import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import { addImageCheck, createPostStore } from '@/features/createPost'

export const useAddImageModal = () => {
  const { t } = useTranslation()

  const onImageDrop = useCallback(
    async (files: File[]) => {
      try {
        createPostStore.continueDialog()
        createPostStore.resetData()
        await addImageCheck(
          files,
          createPostStore.images.count,
          t,
          createPostStore.addImage
        )
        await createPostStore.nextStage()
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
