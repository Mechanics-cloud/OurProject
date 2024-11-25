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
        <span className={'relative bg-dark-100 w-9 h-9 rounded-full'}>
          <Person
            className={
              'absolute text-light-900 block top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
            }
            height={24}
            width={24}
          />
        </span>
      )}

      <Typography variant={'reg16'}>{userName}</Typography>
    </Link>
  )
}
