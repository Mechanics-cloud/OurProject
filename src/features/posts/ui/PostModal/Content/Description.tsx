import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Nullable, Typography } from '@/common'
import { usePostStore } from '@/features/posts'
import Image from 'next/image'

type Props = {
  description: Nullable<string>
}
export const Description = ({ description }: Props) => {
  const { postStore } = usePostStore()

  return (
    description && (
      <div
        className={
          'flex items-center gap-3 py-5 px-6 border-b border-dark-100 box-border'
        }
      >
        <Image
          alt={`Post owner avatar`}
          className={'rounded-full pr-0'}
          height={36}
          priority
          src={postStore.post?.avatarOwner || anonymous}
          width={36}
        />
        <Typography variant={'reg16'}>{description}</Typography>
      </div>
    )
  )
}
