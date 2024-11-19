import * as React from 'react'

import { TextArea, Typography, UserMiniLink, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import {
  CityAutocomplete,
  MaxDescriptionLength,
  addPostStore,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

export const AddTextPost = observer(() => {
  const { t } = useTranslation()
  const userAvatar = generalStore.userAvatar ?? ''
  const userName = generalStore.user?.userName ?? ''
  const location = addPostStore.location
  const postDescription = addPostStore.postDescription
  const addPostDescription = addPostStore.addPostDescription

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
          userAvatarSrc={userAvatar}
          userName={userName}
          userProfileLink={''}
        />
        <TextArea
          className={'h-[120px] resize-none'}
          label={'Add publication descriptions'}
          maxLength={500}
          onChange={(e) => addPostDescription(e.target.value)}
          value={postDescription}
        />
        <Typography
          className={'text-light-900 ml-auto'}
          variant={'small'}
        >
          {`${postDescription.length}/${MaxDescriptionLength}`}
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
