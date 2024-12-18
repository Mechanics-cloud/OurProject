import * as React from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Paths, Typography } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  avatarOwner: string
  userId: number
  userName: string
}

export const LinkProfile = ({ avatarOwner, userId, userName }: Props) => {
  return (
    <Link
      className={'flex gap-3 items-center'}
      href={`${Paths.profileLink(userId)}`}
    >
      <Image
        alt={'Avatar'}
        className={'size-9 rounded-full'}
        height={36}
        src={avatarOwner ? avatarOwner : avatarPlaceholder}
        width={36}
      />
      <Typography
        className={'inline'}
        variant={'bold16'}
      >
        {userName}
      </Typography>
    </Link>
  )
}
