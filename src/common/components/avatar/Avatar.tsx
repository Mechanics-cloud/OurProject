import React from 'react'

import avatarPlaceholder from '@/assets/images/avatar.jpg'
import { Nullable, cn } from '@/common'
import Image, { StaticImageData } from 'next/image'

type Props = {
  alt?: Nullable<string>
  className?: string
  placeholder?: Nullable<string>
  priority: boolean
  size: number
  src?: Nullable<StaticImageData | string>
}

export const Avatar = ({
  alt,
  className,
  placeholder,
  priority,
  size,
  src,
  ...rest
}: Props) => (
  <Image
    alt={alt || ''}
    className={cn('shrink-0', className)}
    height={size}
    priority={priority}
    src={src || placeholder || avatarPlaceholder}
    width={size}
    {...rest}
  />
)
