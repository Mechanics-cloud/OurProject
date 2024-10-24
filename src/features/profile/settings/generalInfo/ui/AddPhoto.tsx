import React, { useState } from 'react'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Button } from '@/common'
import { AvatarDialog } from '@/features/profile/settings/avatarDialog'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import Image from 'next/image'

type Props = {
  onModalPhotoSave: (photo: PhotoResult) => void
  photoObj: PhotoResult
}
export const AddPhoto = React.forwardRef<HTMLDivElement, Props>(
  ({ onModalPhotoSave, photoObj }: Props, _) => {
    return (
      <div className={'flex items-center flex-col h-[500px] gap-6'}>
        <div
          className={
            'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'
          }
        >
          {photoObj?.photo ? (
            <Image
              alt={'avatar'}
              className={'object-cover'}
              height={200}
              src={photoObj.photo}
              width={200}
            />
          ) : (
            <div
              className={
                'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'
              }
            >
              <ImageOutline
                height={48}
                width={48}
              />
            </div>
          )}
        </div>
        <AvatarDialog
          onModalPhotoSave={onModalPhotoSave}
          triggerButton={<Button variant={'outline'}>Add profile photo</Button>}
        />
      </div>
    )
  }
)
