import { useState } from 'react'
import * as React from 'react'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Button } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { AvaratDialog } from '@/features/profile/settings/avatarDialog/AvaratDialog'
import Image from 'next/image'

const ProfileSettings = () => {
  const [photo, setPhoto] = useState<null | string>(null)

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
        {!photo ? (
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
        ) : (
          <Image
            alt={'avatar'}
            className={'object-cover w-[200px] h-[200px]'}
            height={200}
            src={photo}
            width={200}
          />
        )}
      </div>
      <AvaratDialog
        modalHandler={setPhoto}
        triggerButton={<Button variant={'outline'}>Add profile photo</Button>}
      />
    </div>
  )
}

export default withProtection(ProfileSettings, true)
