import * as React from 'react'

import placeholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  href: string
  src: string
  text: string
}

export const LinkProfile = ({ href, src = placeholder, text }: Props) => {
  return (
    <Link
      className={'flex gap-3 items-center'}
      href={href}
    >
      <Image
        alt={'Avatar'}
        className={'size-9 rounded-full'}
        height={36}
        src={src}
        width={36}
      />
      <Typography
        className={'inline truncate'}
        variant={'bold16'}
      >
        {text}
      </Typography>
    </Link>
  )
}
