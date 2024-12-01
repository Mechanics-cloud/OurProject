import React, { useState } from 'react'

import { Button, cn, typographyVariants, useTranslation } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { observer } from 'mobx-react-lite'

import { useCommentsStore } from '../model/homeContext'

export const AddCommentGroup = observer(({ postId }: { postId: number }) => {
  const { t } = useTranslation()
  const [comment, setComment] = useState<string>('')
  const commentsStore = useCommentsStore()

  const onBlur = () => {
    setComment(comment.trim())
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await commentsStore.addComment(postId, comment)

      if (response) {
        setComment('')
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return (
    <div className={'w-full'}>
      <form
        className={'w-full flex  justify-between'}
        onSubmit={onSubmit}
      >
        <input
          className={
            'bg-transparent focus:outline-none text-[14px] font-400  leading-[24px] w-full'
          }
          maxLength={300}
          onBlur={onBlur}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.homePage.addComments}
          type={'text'}
          value={comment}
        ></input>
        <Button
          className={cn(typographyVariants({ variant: 'h3' }), 'px-3')}
          disabled={!comment}
          type={'submit'}
          variant={'text'}
        >
          {t.homePage.publish}
        </Button>
      </form>
    </div>
  )
})
