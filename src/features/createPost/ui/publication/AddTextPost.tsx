import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons'
import {
  Paths,
  Select,
  SelectItem,
  TextArea,
  Typography,
  UserMiniLink,
  useTranslation,
} from '@/common'
import { profileStore } from '@/features/profile'

type Props = {}
export const AddTextPost = (props: Props) => {
  const { t } = useTranslation()
  const userProfile = profileStore.userProfile

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
        <Typography
          className={'text-light-900 mb-1'}
          variant={'reg14'}
        >
          Add location
        </Typography>
        <Select className={'border-dark-100'}>
          <SelectItem value={'ru'}>
            <FlagRussia />
            Russian
          </SelectItem>
          <SelectItem value={'en'}>
            <FlagUnitedKingdom />
            English
          </SelectItem>
        </Select>
      </div>
    </div>
  )
}
