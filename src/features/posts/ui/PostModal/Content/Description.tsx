import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography } from '@/common'
import { usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

export const Description = observer(() => {
  const { postStore } = usePostStore()

  return (
    postStore.post?.description && (
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

        <Typography variant={'reg16'}>{postStore.post?.description}</Typography>
      </div>
    )
  )
})
