import * as React from 'react'
import { useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { ArrowBackOutline } from '@/assets/icons'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
  typographyVariants,
} from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostStore'
import { ControllersPanel } from '@/features/createPost/ui/cropping/ControllersPanel'
import { observer } from 'mobx-react-lite'

export const CropPhotoModal = observer(() => {
  const photos = addPostStore.photos
  const addZoom = addPostStore.addZoom
  const addCrop = addPostStore.addCrop
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })

  const nextStage = addPostStore.nextStage
  const prevStage = addPostStore.prevStage

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    addCrop(photos[0].id, croppedAreaPixels)
    //console.log(croppedArea, croppedAreaPixels)
  }

  const onZoom = (zoom: number) => {
    addZoom(photos[0].id, zoom)
  }

  // const onCrop = (crop: Point) => {
  //   console.log(crop)
  //   setCrop(crop)
  //   addCrop(photos[0].id, crop)
  // }

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
          <span
            className={cn(
              'absolute text-accent-500 cursor-pointer px-3 py-1.5 right-6 top-2',
              typographyVariants({ variant: 'h3' })
            )}
            onClick={nextStage}
          >
            Next
          </span>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription
        asChild
        className={'lg:m-0 lg:p-0'}
      >
        <div
          className={'flex flex-col items-center h-[490px] m-0 p-0 relative'}
        >
          <span className={'relative w-full h-full m-0'}>
            <Cropper
              aspect={photos[0].aspect}
              crop={crop}
              image={photos[0].url as string}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={onZoom}
              zoom={photos[0].zoom ?? 1}
            />
          </span>
          <ControllersPanel id={photos[0].id} />
        </div>
      </DialogDescription>
    </DialogContent>
  )
})
