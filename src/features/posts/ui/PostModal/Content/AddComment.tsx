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

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.currentTarget.value)

  return user ? (
    <div className={'h-[100px] flex justify-between'}>
      <div className={'flex items-center w-full gap-2 relative'}>
        <textarea
          className={
            'bg-transparent focus:outline-none text-[14px] font-400  w-full py-2 lg:px-6 resize-none absolute top-0.5'
          }
          maxLength={300}
          onChange={onChange}
          placeholder={t.post.addComment}
          value={value}
        />
      </div>
      <Button
        className={cn(typographyVariants({ variant: 'h3' }), 'px-3 ml-auto')}
        disabled={!value || commentStore.isLoading}
        onClick={onSubmitForm}
        type={'submit'}
        variant={'text'}
      >
        {t.post.publish}
      </Button>
    </div>
  ) : null
})
