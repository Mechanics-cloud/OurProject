import * as React from 'react'
import { PropsWithChildren, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { ArrowBackOutline } from '@/assets/icons'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Nullable,
  Typography,
  cn,
} from '@/common'
import { useStages } from '@/features/createPost/model/useStages'
import { ControllersPanel } from '@/features/createPost/ui/cropping/ControllersPanel'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  changeState: () => void
  photo: string
  setPhoto: (photo: Nullable<string>) => void
} & DialogProps &
  PropsWithChildren
export const CropPhotoModal = ({ changeState, photo, setPhoto }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const { nextStage, prevStage } = useStages()
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  return (
    <DialogContent
      className={'max-w-[492px] gap-0'}
      crossOff
    >
      <DialogHeader>
        <DialogTitle className={'flex justify-center items-center relative'}>
          <ArrowBackOutline
            className={'absolute top-[18px] left-6'}
            onClick={prevStage}
          />
          <span>Cropping</span>
          <Typography
            className={
              'absolute text-accent-500 cursor-pointer px-3 py-1.5 right-6 top-2'
            }
            onClick={nextStage}
            variant={'h3'}
          >
            Next
          </Typography>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription
        className={cn(
          'flex flex-col items-center h-[490px] m-0 p-0 lg:m-0 lg:p-0 relative'
        )}
      >
        <span className={'relative w-full h-full m-0'}>
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
        <ControllersPanel />
      </DialogDescription>
    </DialogContent>
  )
}
