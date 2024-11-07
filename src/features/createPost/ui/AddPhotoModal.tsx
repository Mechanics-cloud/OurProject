import { ChangeEvent, PropsWithChildren, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Image as ImageFull, ImageOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Nullable,
  cn,
} from '@/common'
import { useStages } from '@/features/createPost/model/useStages'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  className?: string
  setPhoto: (photo: Nullable<string>) => void
} & DialogProps &
  PropsWithChildren

export const AddPhotoModal = ({ setPhoto }: Props) => {
  const { nextStage } = useStages()
  const onPhotoDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPhoto(URL.createObjectURL(acceptedFiles[0]))
      nextStage()
    },
    [setPhoto, nextStage]
  )
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: onPhotoDrop,
  })

  const onPhotoChoose = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const file = inputEvent.target.files?.[0] ?? null

    if (!file) {
      return
    }

    setPhoto(URL.createObjectURL(file))
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
            accept={'.png, .jpg, .jpeg'}
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
