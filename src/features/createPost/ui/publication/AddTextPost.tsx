import * as React from 'react'

import { TextArea, Typography, UserMiniLink, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { CityAutocomplete, createPostStore } from '@/features/createPost'
import { MaxDescriptionLength } from '@/features/createPost/model/constants'
import { observer } from 'mobx-react-lite'

export const AddTextPost = observer(() => {
  const { t } = useTranslation()
  const userAvatar = generalStore.userAvatar ?? ''
  const userName = generalStore.user?.userName ?? ''
  const location = createPostStore.location
  const postDescription = createPostStore.postDescription
  const addPostDescription = createPostStore.addPostDescription

  return (
    <div className={'border-l-[1px] border-dark-100 w-full text-left'}>
      <div className={'p-6 border-b-[1px] border-dark-100 flex flex-col'}>
        <UserMiniLink
          className={
            'hover:text-light-100 cursor-auto pointer-events-none mb-6'
          }
          name={userName}
          onClick={(e) => {
            e.preventDefault()
          }}
          src={userAvatar}
        />
        <TextArea
          className={'h-[120px] resize-none'}
          disabled={generalStore.isLoading}
          label={t.createPost.publication.description}
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

      <div className={'p-6 pb-1 flex flex-col'}>
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
