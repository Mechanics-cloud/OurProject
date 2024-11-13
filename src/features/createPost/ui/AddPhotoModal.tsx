import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { Image as ImageFull, ImageOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
  useTranslation,
} from '@/common'
import { addPhotosCheck } from '@/features/createPost/model/addPhotosCheck'
import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'

export const AddPhotoModal = () => {
  const { t } = useTranslation()
  const nextStage = useMemo(() => addPostPhotoStore.nextStage, [])
  const addPostPhoto = useMemo(() => addPostPhotoStore.addPhoto, [])
  const totalCount = addPostPhotoStore.getCurrentPhotosCount()

  const onPhotoDrop = useCallback(
    async (files: File[]) => {
      await addPhotosCheck(files, totalCount, t, addPostPhoto)
      nextStage()
    },
    [nextStage, addPostPhoto, t, totalCount]
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
      <DialogDescription
        className={cn('flex flex-col items-center gap-16 mt-16 mb-10')}
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

        <label>
          <Button
            asChild
            className={'cursor-pointer'}
          >
            <span>Load</span>
          </Button>
          <input
            className={'sr-only'}
            type={'file'}
            {...getInputProps()}
          />
        </label>
      </DialogDescription>
    </DialogContent>
  )
}
