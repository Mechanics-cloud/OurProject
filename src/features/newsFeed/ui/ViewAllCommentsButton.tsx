import React, { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useTranslation,
} from '@/common'
import { observer } from 'mobx-react-lite'

import { useCommentsStore } from '../model/newsFeedContext'
import { PostDescription } from './PostDescription'

type Props = {
  postId: number
}

//TODO to change (in progress) добавить стили, отрисовать слайдер, в поповер добавить логику
export const ViewAllCommentsButton = observer(({ postId }: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const commentsStore = useCommentsStore()

  const isButtonDisabled =
    commentsStore.isLoading ||
    commentsStore.comments === null ||
    commentsStore.comments.totalCount === 0

  useEffect(() => {
    commentsStore.getComments(postId)
  }, [postId, commentsStore])

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
                ? t.homePage.loading
                : `${t.homePage.viewAllComments} (${
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
