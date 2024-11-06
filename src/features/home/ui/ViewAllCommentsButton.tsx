import React, { useEffect, useMemo, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { observer } from 'mobx-react-lite'

import { useStore } from '../model/homeContext'
import { PostDescription } from './PostDescription'

type ViewAllComments = {
  postId: number
}

//TODO to change (in progress) добавить стили, отрисовать слайдер, в поповер добавить логику
export const ViewAllCommentsButton = observer(({ postId }: ViewAllComments) => {
  // const commentsStore = useMemo(() => new CommentsStore(), [])
  const commentsStore = useStore()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    commentsStore.getComments(postId)
  }, [postId, commentsStore])

  const isButtonDisabled =
    commentsStore.isLoading ||
    commentsStore.comments === null ||
    commentsStore.comments.totalCount === 0

  return (
    <div className={'w-full h-6 mb-4 flex items-center '}>
      <Popover
        onOpenChange={setIsOpen}
        open={isOpen}
      >
        <PopoverTrigger asChild>
          <button
            disabled={isButtonDisabled}
            type={'button'}
          >
            <span
              className={'text-[14px] font-bold leading-[24px] text-light-900'}
            >
              {commentsStore.isLoading
                ? 'Loading...'
                : `View All Comments (${
                    commentsStore.comments?.totalCount || 0
                  })`}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={'z-50 w-[600px] max-h-[600px]  flex flex-col'}
          sideOffset={3}
        >
          {commentsStore.comments?.items.map((item) => (
            <PostDescription
              item={item}
              key={item.id}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
})
