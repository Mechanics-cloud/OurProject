import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import { addPhotosCheck, addPostStore } from '@/features/createPost'

export const useAddPhotoModal = () => {
  const { t } = useTranslation()
  const isDraft = addPostStore.isDraft
  const totalCount = addPostStore.images.count

  const onPhotoDrop = useCallback(
    async (files: File[]) => {
      try {
        addPostStore.continueDialog()
        addPostStore.resetData()
        await addPhotosCheck(files, totalCount, t, addPostStore.addImage)
        await addPostStore.nextStage()
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
    [t, totalCount]
  )

  const dropzoneOptions = useMemo(
    () => ({
      accept: {
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
      },
      multiple: true,
      onDrop: onPhotoDrop,
    }),
    [onPhotoDrop]
  )

  const { getInputProps, getRootProps, isDragActive } =
    useDropzone(dropzoneOptions)

  return {
    getInputProps,
    getRootProps,
    isDraft,
    isDragActive,
    t,
  }
}
