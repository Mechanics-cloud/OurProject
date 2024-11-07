import * as React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Nullable,
  SwiperImage,
  Typography,
  cn,
} from '@/common'
import { useStages } from '@/features/createPost/model/useStages'

type Props = {
  photo: string
  setPhoto: (photo: Nullable<string>) => void
}
export const FilterPhotoModal = ({ photo, setPhoto }: Props) => {
  const { nextStage, prevStage } = useStages()

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
        <SwiperImage
          className={'w-[490px]'}
          images={[
            {
              height: 300,
              url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Misha_Collins_%26_Jensen_Ackles_%2848478258422%29%28c%29.jpg',
              width: 300,
            },
          ]}
        />
      </DialogDescription>
    </DialogContent>
  )
}
