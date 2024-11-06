import { ChangeEvent, PropsWithChildren, useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'
import Cropper, { Area, Point } from 'react-easy-crop'

import { Image as ImageFull, ImageOutline } from '@/assets/icons'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Nullable,
  cn,
} from '@/common'
import { History } from '@/features/createPost/model/historyOfChanges'
import { DialogProps } from '@radix-ui/react-dialog'
import Image from 'next/image'

type Props = {
  className?: string
  title: string
} & DialogProps &
  PropsWithChildren

export const AvatarDialog = ({
  children,
  className,
  onOpenChange,
  open,
  title,
  ...rest
}: Props) => {
  // const stages = ['add', 'resize', 'filter', 'text']
  // const photo = []
  const stages = new History()
  const [photo, setPhoto] = useState<Nullable<string>>(null)

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const onPhotoDrop = useCallback((acceptedFiles: File[]) => {
    setPhoto(URL.createObjectURL(acceptedFiles[0]))
  }, [])
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: onPhotoDrop,
  })

  const onPhotoChoose = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const file = inputEvent.target.files?.[0] ?? null

    if (!file) {
      return
    }

    setPhoto(URL.createObjectURL(file))
  }

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
      {...rest}
    >
      <DialogContent className={'max-w-[492px]'}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription
          className={cn(
            'flex flex-col items-center gap-16 mt-16 mb-10',
            className
          )}
          {...getRootProps()}
        >
          {photo ? (
            // <Image
            //   alt={'sss'}
            //   height={300}
            //   src={photo}
            //   width={300}
            // />
            <span className={'relative w-full h-96'}>
              <Cropper
                aspect={4 / 3}
                crop={crop}
                image={photo}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                zoom={zoom}
              />
            </span>
          ) : (
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
          )}
          <label htmlFor={'chooseFileInput'}>
            <Button
              asChild
              className={'cursor-pointer'}
            >
              <span>Load</span>
            </Button>
            <input
              accept={'.png, .jpg, .jpeg'}
              className={'sr-only'}
              id={'chooseFileInput'}
              onChange={onPhotoChoose}
              type={'file'}
              {...getInputProps()}
            />
          </label>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
