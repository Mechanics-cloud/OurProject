import React from 'react'

import { Close } from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Button, FormTextArea, Typography } from '@/common'
import { CancelEditModal, PostSlider } from '@/features/posts'
import { useEditMode } from '@/features/posts/ui/EditModal/useEditMode'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

export const Edit = observer(() => {
  const {
    closeConfirmModal,
    control,
    description,
    isDirty,
    isModalOpen,
    isSubmitting,
    maxDescriptionLength,
    onCancelEdit,
    onCloseClick,
    onSubmit,
    post,
    t,
  } = useEditMode()

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
        <Typography
          className={'pl-8'}
          variant={'h1'}
        >
          {t.post.editPost}
        </Typography>
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
              onSubmit={onSubmit}
            >
              <div>
                <FormTextArea
                  className={'h-[250px] resize-none'}
                  control={control}
                  label={t.post.editDescription}
                  maxLength={maxDescriptionLength}
                  name={'description'}
                />
                <div className={'flex items-center w-full'}>
                  {description?.length === maxDescriptionLength && (
                    <Typography
                      className={'text-red-500 text-right'}
                      variant={'small'}
                    >
                      {t.post.maxLengthMessage}
                    </Typography>
                  )}
                  <Typography
                    className={'text-light-900 text-right ml-auto'}
                    variant={'small'}
                  >
                    {description?.length}/{maxDescriptionLength}
                  </Typography>
                </div>
              </div>
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
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </div>
  )
})
