import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons'
import { Typography, cn } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  userAvatarSrc: string
  userName: string
  userProfileLink: string
} & ComponentPropsWithoutRef<'a'>

export const UserMiniLink = ({
  className,
  onClick,
  userAvatarSrc,
  userName,
  userProfileLink,
}: Props) => {
  return (
    <Link
      className={cn(
        'flex gap-3 items-center hover:text-accent-500 transition',
        className
      )}
      href={userProfileLink}
      onClick={onClick}
    >
      {userAvatarSrc ? (
        <Image
          alt={userName}
          className={'w-9 h-9 rounded-full'}
          height={36}
          src={userAvatarSrc}
          width={36}
        />
      ) : (
        <Person
          className={'bg-dark-100 w-9 h-9 rounded-full text-light-900'}
          height={36}
          width={36}
        />
      )}

      <Typography variant={'reg16'}>{userName}</Typography>
    </Link>
  )
}
