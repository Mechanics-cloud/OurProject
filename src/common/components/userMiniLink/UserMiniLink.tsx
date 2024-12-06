import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons'
import { Typography, cn } from '@/common'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Variant } from '../typography/Typography'

type Props = {
  userAvatarSrc: StaticImageData | string
  userName: string
  userProfileLink: string
  variant?: Variant
} & ComponentPropsWithoutRef<'a'>

export const UserMiniLink = ({
  className,
  onClick,
  userAvatarSrc,
  userName,
  userProfileLink,
  variant = 'reg16',
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
      <Typography variant={variant}>{userName}</Typography>
    </Link>
  )
}
