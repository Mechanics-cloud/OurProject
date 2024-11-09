import { ChangeEvent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Image as ImageFull, ImageOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
} from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostStore'

export const AddPhotoModal = () => {
  const nextStage = addPostStore.nextStage
  const addPostPhoto = addPostStore.addPhoto
  const onPhotoDrop = useCallback(
    (file: File[]) => {
      addPostPhoto(file[0])
      nextStage()
    },
    [nextStage, addPostPhoto]
  )
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: onPhotoDrop,
  })

  const onPhotoChoose = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const file = inputEvent.target.files?.[0] ?? null

    if (!file) {
      return
    }
    addPostPhoto(file)
    nextStage()
  }

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
            accept={'*/image, .png, .jpg, .jpeg'}
            className={'sr-only'}
            onChange={onPhotoChoose}
            type={'file'}
            {...getInputProps()}
          />
        </label>
      </DialogDescription>
    </DialogContent>
  )
}
