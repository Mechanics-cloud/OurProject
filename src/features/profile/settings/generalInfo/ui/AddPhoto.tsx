import React from 'react'

import { CloseOutline, ImageOutline } from '@/assets/icons/outlineIcons'
import { Button, cn, useTranslation } from '@/common'
import { AvatarDialog } from '@/features/profile/settings/avatarDialog'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import Image from 'next/image'

type Props = {
  onModalPhotoSave: (photo: PhotoResult) => void
  photoObj: PhotoResult
}
export const AddPhoto = ({ onModalPhotoSave, photoObj }: Props) => {
  const { t } = useTranslation()
  const imageClass =
    'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'

  return (
    <div className={'flex items-center flex-col h-[500px] gap-6'}>
      <div className={'relative'}>
        {photoObj?.photo ? (
          <Image
            alt={'avatar'}
            className={cn('object-cover', imageClass)}
            height={200}
            src={photoObj.photo}
            width={200}
          />
        ) : (
          <ImageOutline
            className={imageClass}
            height={48}
            width={48}
          />
        )}
        <button
          className={
            'absolute bg-red-800 rounded-full top-2 right-8 h-6 w-6 flex items-center justify-center border-4 border-dark-700'
          }
          type={'button'}
        >
          <CloseOutline />
        </button>
      </div>

      <AvatarDialog
        onModalPhotoSave={onModalPhotoSave}
        triggerButton={
          <Button
            className={'min-w-[196px]'}
            variant={'outline'}
          >
            {t.profileInputs.addProfilePhoto}
          </Button>
        }
      />
    </div>
  )
}
