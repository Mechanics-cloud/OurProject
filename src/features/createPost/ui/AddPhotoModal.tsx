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
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  changeState: () => void
  className?: string
  setPhoto: (photo: Nullable<string>) => void
  title: string
} & DialogProps &
  PropsWithChildren

export const AddPhotoModal = ({ changeState, setPhoto, title }: Props) => {
  const onPhotoDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPhoto(URL.createObjectURL(acceptedFiles[0]))
      changeState()
    },
    [setPhoto, changeState]
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
    changeState()
  }

  return (
    <DialogContent className={'max-w-[492px]'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
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
