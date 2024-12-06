import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons'
import { Typography, cn, typographyVariants } from '@/common'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Variant } from '../typography/Typography'

type Props = {
  avatarSrc: StaticImageData | string
  name: string
  profileLink: string
  variant?: Variant
} & ComponentPropsWithoutRef<'a'>

export const UserMiniLink = ({
  avatarSrc,
  className,
  name,
  onClick,
  profileLink,
  variant = 'reg16',
}: Props) => {
  return (
    <Link
      className={cn(
        'flex gap-3 items-center hover:text-accent-500 transition',
        className
      )}
      href={profileLink}
      onClick={onClick}
    >
      {avatarSrc ? (
        <Image
          alt={name}
          className={'w-9 h-9 rounded-full'}
          height={36}
          src={avatarSrc}
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
      <span className={typographyVariants({ variant: variant })}>{name}</span>
    </Link>
  )
}
