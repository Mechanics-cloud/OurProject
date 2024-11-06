import React from 'react'

import { CloseOutline, ImageOutline } from '@/assets/icons/outlineIcons'
import { Button, cn, useTranslation } from '@/common'
import { AvatarDialog } from '@/features/profile/settings/avatarDialog'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import Image from 'next/image'

type Props = {
  onModalPhotoSave: (photo: PhotoResult) => void
  photoObj: PhotoResult
  setPhotoChanged: (photoChanged: boolean) => void
  setPhotoObj: (photoObj: PhotoResult) => void
}
export const AddPhoto = ({
  onModalPhotoSave,
  photoObj,
  setPhotoChanged,
  setPhotoObj,
}: Props) => {
  const { t } = useTranslation()
  const imageClass =
    'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'

  const onDeleteAvatar = () => {
    setPhotoObj({
      photo: null,
      photoForServer: null,
    })
    setPhotoChanged(true)
  }

  return (
    <div className={'flex items-center flex-col h-[500px] gap-6'}>
      {photoObj?.photo ? (
        <div className={cn('relative object-cover', imageClass)}>
          <Image
            alt={'avatar'}
            height={200}
            src={photoObj.photo}
            width={200}
          />
          <button
            className={
              'absolute bg-red-800 rounded-full top-2 right-8 h-6 w-6 flex items-center justify-center border-4 border-dark-700'
            }
            onClick={onDeleteAvatar}
            type={'button'}
          >
            <CloseOutline />
          </button>
        </div>
      ) : (
        <div className={cn(imageClass, 'w-[200px] h-[200px]')}>
          <ImageOutline
            height={48}
            width={48}
          />
        </div>
      )}

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
