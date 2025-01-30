import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Close } from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Button, FormTextArea, Typography, useTranslation } from '@/common'
import { usePostStore } from '@/features/posts'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'
import Image from 'next/image'

export const EditPost = ({
  openConfirmModal,
}: {
  openConfirmModal: () => void
}) => {
  const { postStore } = usePostStore()
  const { t } = useTranslation()
  const post = postStore.post
  const maxDescriptionLength = 500

  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
  } = useForm<{ description: string }>({
    defaultValues: {
      description: post?.description || '',
    },
  })

  const onSaveClick: SubmitHandler<{ description: string }> = async (data) => {
    if (data.description) {
      await postStore.editPostDescription(data.description)
    }
  }

  const onCloseClick = () => {
    if (isDirty) {
      openConfirmModal()
    } else {
      postStore.stopEditing()
    }
  }

  return (
    <div
      className={
        'flex flex-col  bg-dark-300 relative container mx-auto w-[972px] h-[564px]'
      }
    >
      <div
        className={
          "flex items-center justify-between p-[0.75rem] w-full relative after:absolute after:content-[''] after:block after:w-full after:h-px after:bg-dark-100 after:left-0 after:bottom-0"
        }
      >
        <Typography variant={'h1'}>Edit Post</Typography>
        <Close
          className={'w-6 h-6 cursor-pointer mr-1.5'}
          onClick={onCloseClick}
        />
      </div>
      <div className={'flex w-full h-full'}>
        <PostSlider />
        <div className={'flex flex-col w-full h-full p-6 justify-between'}>
          <div className={'flex flex-col gap-3 h-full'}>
            <div className={'flex items-center gap-3'}>
              <Image
                alt={`Post owner avatar`}
                className={'rounded-full pr-0'}
                height={36}
                priority
                src={post?.avatarOwner || anonymous}
                width={36}
              />
              <Typography variant={'reg16'}>{post?.userName}</Typography>
            </div>
            <form
              className={'flex flex-col justify-between h-full'}
              onSubmit={handleSubmit(onSaveClick)}
            >
              <FormTextArea
                className={'h-[120px] resize-none'}
                control={control}
                label={t.post.editDescription}
                name={'description'}
              />
              <Typography
                className={'text-light-900 text-right'}
                variant={'small'}
              >
                {postStore.post?.description.length}/{maxDescriptionLength}
              </Typography>
              <Button
                className={'max-w-[160px] ml-auto'}
                disabled={!isDirty || isSubmitting}
              >
                {t.post.saveChanges}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
