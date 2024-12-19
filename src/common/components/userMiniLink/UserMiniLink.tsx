import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons'
import { ImageUrl, cn, typographyVariants } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

import { Variant } from '../typography/Typography'

type Props = {
  href?: string
  name: string
  src: ImageUrl
  variant?: Variant
} & ComponentPropsWithoutRef<'a'>

export const UserMiniLink = ({
  className,
  href = '',
  name,
  onClick,
  src,
  variant = 'reg16',
}: Props) => {
  return (
    <Link
      className={cn(
        'flex gap-3 items-center hover:text-accent-500 transition',
        className
      )}
      href={href}
      onClick={onClick}
    >
      {src ? (
        <Image
          alt={name}
          className={'w-9 h-9 rounded-full'}
          height={36}
          src={src}
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
