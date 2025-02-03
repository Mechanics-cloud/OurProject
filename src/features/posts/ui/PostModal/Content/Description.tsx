import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography } from '@/common'
import { observer } from 'mobx-react-lite'
import Image, { StaticImageData } from 'next/image'

type Props = {
  avatarOwner: StaticImageData | string
  description: string | undefined
}
export const Description = observer(({ avatarOwner, description }: Props) => {
  return (
    <div
      className={
        'flex gap-3 items-start mb-4 border-b border-dark-100 box-border py-2'
      }
    >
      <Image
        alt={`Post owner avatar`}
        className={'rounded-full pr-0'}
        height={36}
        priority
        src={avatarOwner || anonymous}
        width={36}
      />

      <Typography variant={'reg16'}>{description}</Typography>
    </div>
  )
})
