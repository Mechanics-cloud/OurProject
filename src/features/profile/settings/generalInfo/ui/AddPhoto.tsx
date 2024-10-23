import React, { useState } from 'react'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Button } from '@/common'
import { AvatarDialog } from '@/features/profile/settings/avatarDialog'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import ProfileStore from '@/features/profile/settings/generalInfo/model/profileStore'
import Image from 'next/image'

import avatarPlaceholder from '../../../../../assets/images/avatar.jpg'

type Props = {
  onModalPhotoSave: (photo: PhotoResult) => void
}
export const AddPhoto = React.forwardRef<HTMLDivElement, Props>(
  ({ onModalPhotoSave }: Props, _) => {
    const currentPhoto = ProfileStore.userProfile?.avatars[0].url
    const [photoObj, setPhotoObj] = useState<PhotoResult>({
      photo: currentPhoto || null,
      photoForServer: null,
    })

    const handlePhotoSave = (photo: PhotoResult) => {
      setPhotoObj(photo)
      onModalPhotoSave(photo)
    }

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
              src={photoObj.photo || currentPhoto || avatarPlaceholder}
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
          onModalPhotoSave={handlePhotoSave}
          triggerButton={<Button variant={'outline'}>Add profile photo</Button>}
        />
      </div>
    )
  }
)
