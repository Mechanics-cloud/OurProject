import { useState } from 'react'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Button } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { AvatarDialog } from '@/features/profile/settings/avatarDialog'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import Image from 'next/image'

// todo заменить данную страницу на страницу из задачи IN-99/IN-107

const ProfileSettings = () => {
  const [photoObj, setPhotoObj] = useState<PhotoResult>()

  return (
    <div
      className={
        'flex justify-center items-center flex-col w-full h-[500px] gap-6'
      }
    >
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
        onModalPhotoSave={setPhotoObj}
        triggerButton={<Button variant={'outline'}>Add profile photo</Button>}
      />
    </div>
  )
}

export default withProtection(ProfileSettings, true)
