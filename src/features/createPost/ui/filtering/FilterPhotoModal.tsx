import * as React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Nullable,
  SwiperImage,
  cn,
  typographyVariants,
} from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostStore'
import { Filters } from '@/features/createPost/ui/filtering/Filters'

type Props = {
  photo: string
  setPhoto: (photo: Nullable<string>) => void
}
export const FilterPhotoModal = ({ photo, setPhoto }: Props) => {
  const nextStage = addPostStore.nextStage
  const prevStage = addPostStore.prevStage

  return (
    <DialogContent
      className={'max-w-[972px] gap-0'}
      crossOff
    >
      <DialogHeader>
        <DialogTitle className={'flex justify-center items-center relative'}>
          <ArrowBackOutline
            className={'absolute top-[18px] left-6'}
            onClick={prevStage}
          />
          <span>Filters</span>
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
        className={cn('m-0 p-0 lg:m-0 lg:p-0')}
      >
        <div className={'flex h-[504px] relative'}>
          <SwiperImage
            className={cn('w-[490px] m-0 shrink-0', 'addPost')}
            images={[
              {
                height: 300,
                url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Misha_Collins_%26_Jensen_Ackles_%2848478258422%29%28c%29.jpg',
                width: 300,
              },
              {
                height: 300,
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Jensen_Ackles.jpg/640px-Jensen_Ackles.jpg',
                width: 300,
              },
            ]}
          />
          <Filters
            src={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Jensen_Ackles.jpg/640px-Jensen_Ackles.jpg'
            }
          />
        </div>
      </DialogDescription>
    </DialogContent>
  )
}
