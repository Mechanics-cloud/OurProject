import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { Image as ImageFull, ImageOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  useTranslation,
} from '@/common'
import { addPhotosCheck } from '@/features/createPost/model/addPhotosCheck'
import { addPostStore } from '@/features/createPost/model/addPostStore'

export const AddPhotoModal = () => {
  const { t } = useTranslation()
  const nextStage = useMemo(() => addPostStore.nextStage, [])
  const clearOldData = addPostStore.resetData
  const isDraft = addPostStore.isDraft
  const setIsNotNewDialog = addPostStore.continueDialog
  const addPostPhoto = useMemo(() => addPostStore.addPhoto, [])
  const totalCount = addPostStore.getCurrentPhotosCount()

  const onPhotoDrop = useCallback(
    async (files: File[]) => {
      setIsNotNewDialog()
      clearOldData()
      await addPhotosCheck(files, totalCount, t, addPostPhoto)
      nextStage()
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

  return (
    <DialogContent className={'max-w-[492px]'}>
      <DialogHeader>
        <DialogTitle>Add photo</DialogTitle>
      </DialogHeader>
      <DialogDescription className={'mt-16 mb-10 flex justify-center'}>
        <span className={'flex flex-col w-max'}>
          <span
            className={'flex flex-col items-center gap-6 mb-6'}
            {...getRootProps()}
          >
            <span
              className={
                'w-[220px] aspect-square flex justify-center items-center bg-dark-500'
              }
            >
              {isDragActive ? (
                <ImageFull
                  height={48}
                  width={48}
                />
              ) : (
                <ImageOutline
                  height={48}
                  width={48}
                />
              )}
            </span>

            <label className={'mt-9'}>
              <Button
                asChild
                className={'cursor-pointer'}
              >
                <span>Select from Computer</span>
              </Button>
              <input
                className={'sr-only'}
                type={'file'}
                {...getInputProps()}
              />
            </label>
          </span>
          <Button
            disabled={!isDraft}
            onClick={() => setIsNotNewDialog()}
            variant={'outline'}
          >
            Open Draft
          </Button>
        </span>
      </DialogDescription>
    </DialogContent>
  )
}
