import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons'
import { ImageUrl, Nullable, cn, typographyVariants } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

import { Variant } from '../typography/Typography'

type Props = {
  alt?: string
  href?: string
  name?: string
  size?: number
  src?: Nullable<ImageUrl>
  variant?: Variant
} & ComponentPropsWithoutRef<'a'>

export const UserMiniLink = ({
  alt = '',
  className,
  href = '',
  name,
  size = 36,
  src,
  variant = 'reg16',
  ...rest
}: Props) => {
  return (
    <Link
      className={cn(
        'flex gap-3 items-center hover:text-accent-500 transition',
        className
      )}
      href={href}
      {...rest}
    >
      {src ? (
        <Image
          alt={alt || name || ''}
          className={'rounded-full'}
          height={size}
          src={src}
          width={size}
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
      {name && (
        <span
          className={cn(typographyVariants({ variant: variant }), 'truncate')}
        >
          {name}
        </span>
      )}
    </Link>
  )
}
