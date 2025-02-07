import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { TextUnfolding } from '@/common'
import { observer } from 'mobx-react-lite'
import Image, { StaticImageData } from 'next/image'

type Props = {
  avatarOwner: StaticImageData | string
  description: string | undefined
  isAvatarHidden: boolean
}
export const Description = observer(
  ({ avatarOwner, description, isAvatarHidden }: Props) => {
    return (
      <div
        className={
          'flex gap-3 items-start mb-4 border-b border-dark-100 box-border py-2'
        }
      >
        {!isAvatarHidden && (
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={avatarOwner || anonymous}
            width={36}
          />
        )}

        <TextUnfolding charactersToShow={250}>
          {description || ''}
        </TextUnfolding>
      </div>
    )
  }
)
