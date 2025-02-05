import React, { useState } from 'react'

import { Close } from '@/assets/icons'
import { Loader, PathService, PublicPaths, useTranslation } from '@/common'
import { PostInfo, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

type Props = {
  userId: number
}

export const Post = observer(({ userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { post } = postStore
  const router = useRouter()

  const onClose = async () => {
    setIsLoading(true)
    await router.push(
      PathService.generatePath(PublicPaths.userProfile, { userId: userId })
    )
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={'w-full h-full flex items-center '}
        onClick={onClose}
      >
        <div
          className={'relative container mx-auto w-[972px] h-[564px]'}
          onClick={(e) => e.stopPropagation()}
        >
          {!post?.id || !post ? (
            <div
              className={
                'w-full h-full bg-dark-300 flex items-center justify-center'
              }
            >
              {t.post.notFound}
            </div>
          ) : (
            <PostInfo />
          )}
          <Close
            className={'absolute w-6 h-6 -top-6 -right-6 cursor-pointer'}
            onClick={onClose}
          />
        </div>
      </div>
    </>
  )
})
