import React, { useState } from 'react'

import { Close } from '@/assets/icons'
import { Loader, PathService, PublicPaths, useTranslation } from '@/common'
import { Stub } from '@/common/components/stub/Stub'
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
      PathService.generatePath(PublicPaths.userProfile, { userId })
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
          className={
            'relative container mx-auto xl:w-[972px] xl:h-[564px] lg:w-[872px] lg:h-[464px]'
          }
          onClick={(e) => e.stopPropagation()}
        >
          {!post?.id || !post ? (
            <div
              className={
                'w-full h-full bg-dark-500 flex items-center justify-center'
              }
            >
              <Stub
                alt={''}
                className={'w-[70%] h-[70%]'}
                textClassName={
                  'font-bold leading-[36px] text-[20px] mt-5 text-inherit'
                }
                title={t.post.notFound}
              />
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
