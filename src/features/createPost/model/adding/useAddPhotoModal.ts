import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import { addPhotosCheck, addPostStore } from '@/features/createPost'

export const useAddPhotoModal = () => {
  const { t } = useTranslation()
  const nextStage = useMemo(() => addPostStore.nextStage, [])
  const clearOldData = addPostStore.resetData
  const isDraft = addPostStore.isDraft
  const setIsNotNewDialog = addPostStore.continueDialog
  const addPostPhoto = addPostStore.addPhoto
  const totalCount = addPostStore.photos.count

  const onPhotoDrop = useCallback(
    async (files: File[]) => {
      try {
        setIsNotNewDialog()
        clearOldData()
        await addPhotosCheck(files, totalCount, t, addPostPhoto)
        await nextStage()
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
    [nextStage, addPostPhoto, t, totalCount, setIsNotNewDialog, clearOldData]
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
    setIsNotNewDialog,
    t,
  }
}
