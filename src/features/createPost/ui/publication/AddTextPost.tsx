import * as React from 'react'

import { TextArea, Typography, UserMiniLink, useTranslation } from '@/common'
import { addPostPhotoStore } from '@/features/createPost'
import { CityAutocomplete } from '@/features/createPost/ui/publication/CityAutocomplete'
import { profileStore } from '@/features/profile'
import { observer } from 'mobx-react-lite'

export const AddTextPost = observer((s) => {
  const { t } = useTranslation()
  const userProfile = profileStore.userProfile
  const location = addPostPhotoStore.location

  return (
    <div className={'border-l-[1px] border-dark-100 w-full'}>
      <div className={'p-6 border-b-[1px] border-dark-100 flex flex-col'}>
        <UserMiniLink
          className={
            'hover:text-light-100 cursor-auto pointer-events-none mb-6'
          }
          onClick={(e) => {
            e.preventDefault()
          }}
          userAvatarSrc={userProfile?.avatars[0].url ?? ''}
          userName={userProfile?.userName ?? ''}
          userProfileLink={''}
        />
        <TextArea
          className={'h-[120px] resize-none'}
          label={'Add publication descriptions'}
          maxLength={500}
        />
        <Typography
          className={'text-light-900 ml-auto'}
          variant={'small'}
        >
          0/500
        </Typography>
      </div>

      <div className={'p-6 flex flex-col'}>
        <CityAutocomplete />
        <Typography
          className={'-mt-3 ml-0.5'}
          variant={'reg16'}
        >
          {location[0]}
        </Typography>
        <Typography
          className={'text-light-900 mt-1.5 ml-0.5'}
          variant={'small'}
        >
          {location[1]}
        </Typography>
      </div>
    </div>
  )
})
