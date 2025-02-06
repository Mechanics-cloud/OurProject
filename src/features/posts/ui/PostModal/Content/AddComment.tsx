import React, { ChangeEvent, useState } from 'react'

import { Button, cn, typographyVariants, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'

export const AddComment = observer(() => {
  const { t } = useTranslation()
  const { commentStore, postStore } = usePostStore()
  const { user } = generalStore

  const [value, setValue] = useState('')

  const onSubmitForm = async () => {
    const comment = value.trim()
    const postId = postStore.post?.id

    if (comment && postId) {
      await commentStore.createComment({ comment, postId })
      commentStore.setShouldScroll(true)
    }
    setValue('')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value)

  return user ? (
    <div className={'flex items-center w-full'}>
      <input
        className={
          'bg-transparent focus:outline-none text-[14px] font-400 leading-[24px] w-full py-4 px-6'
        }
        maxLength={300}
        onChange={onChange}
        placeholder={t.post.addComment}
        type={'text'}
        value={value}
      />
      <Button
        className={cn(typographyVariants({ variant: 'h3' }), 'px-2 mx-1')}
        disabled={!value}
        onClick={onSubmitForm}
        type={'submit'}
        variant={'text'}
      >
        {t.post.publish}
      </Button>
    </div>
  ) : null
})
