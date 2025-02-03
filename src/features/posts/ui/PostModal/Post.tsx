import React from 'react'

import { Close } from '@/assets/icons'
import { PathService, PublicPaths, useTranslation } from '@/common'
import { PostInfo, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

type Props = {
  userId: number
}

export const Post = observer(({ userId }: Props) => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { post } = postStore
  const router = useRouter()

  if (!post) {
    return (
      <div
        className={'flex justify-center items-center w-full h-full bg-dark-300'}
      >
        {t.post.notFound}
      </div>
    )
  }

  const onClose = async () => {
    await router.push(
      PathService.generatePath(PublicPaths.userProfile, { userId: userId })
    )
  }

  return (
    <div className={'relative container mx-auto w-[972px] h-[564px]'}>
      <PostInfo />
      <Close
        className={'absolute w-6 h-6 -top-6 -right-6 cursor-pointer'}
        onClick={onClose}
      />
    </div>
  )
})
