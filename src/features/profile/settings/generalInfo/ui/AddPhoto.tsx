import React from 'react'

import { CloseOutline, ImageOutline } from '@/assets/icons'
import { Button, PhotoResult, cn, useTranslation } from '@/common'
import { AvatarDialog } from '@/features/profile'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

type Props = {
  onModalPhotoSave: (photo: PhotoResult) => void
  photoObj: PhotoResult
  setIsPhotoChanged: (isPhotoChanged: boolean) => void
  setPhotoObj: (photoObj: PhotoResult) => void
}
export const AddPhoto = observer(
  ({ onModalPhotoSave, photoObj, setIsPhotoChanged, setPhotoObj }: Props) => {
    const { t } = useTranslation()
    const imageClass =
      'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'

    const onDeleteAvatar = () => {
      setIsPhotoChanged(true)
      setPhotoObj({
        photoFile: null,
        photoUrl: null,
      })
    }

    return (
      <div className={'flex items-center flex-col gap-6'}>
        {photoObj.photoUrl ? (
          <div className={cn('relative object-cover', imageClass)}>
            {photoObj.photoUrl && (
              <Image
                alt={'avatar'}
                className={'rounded-full pr-0'}
                height={200}
                src={photoObj.photoUrl}
                width={200}
              />
            )}
            {photoObj.photoUrl && (
              <button
                className={
                  'absolute bg-red-800 rounded-full top-2 right-8 h-6 w-6 flex items-center justify-center border-4 border-dark-700'
                }
                onClick={onDeleteAvatar}
                type={'button'}
              >
                <CloseOutline />
              </button>
            )}
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
)
