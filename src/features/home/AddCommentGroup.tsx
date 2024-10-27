import React, { useState } from 'react'

import { Button, typographyVariants } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { instance } from '@/features/auth'

type CommentGroup = {
  postId: number
}

const AddCommentGroup = ({ postId }: CommentGroup) => {
  const [comment, setComment] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await instance.post<any>(
        `/v1/posts/${postId}/comments`,
        {
          content: comment,
        }
      )

      setComment('')
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
            'placeholder-light-900 text-[14px] font-400  leading-[24px] w-full'
          }
          onChange={(e) => setComment(e.target.value)}
          placeholder={'Add a Comments...'}
          type={'text'}
          value={comment}
        ></input>
        <Button
          className={typographyVariants({ variant: 'h3' })}
          type={'submit'}
          variant={'text'}
        >
          Publish
        </Button>
      </form>
    </div>
  )
}

export default AddCommentGroup
