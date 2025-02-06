import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  FormTextArea,
  PathService,
  PublicPaths,
  Typography,
} from '@/common'
import { CancelEditModal, PostSlider } from '@/features/posts'
import { useEditMode } from '@/features/posts/ui/EditModal/useEditMode'
import Image from 'next/image'
import Link from 'next/link'

export const MobileEdit = () => {
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
    <form onSubmit={onSubmit}>
      <div className={'flex items-center justify-between w-full'}>
        <Button
          onClick={onCloseClick}
          type={'button'}
          variant={'text'}
        >
          Cancel
        </Button>
        <Typography
          className={'text-center'}
          variant={'h2'}
        >
          {t.post.editPost}
        </Typography>
        <Button
          disabled={!isDirty || isSubmitting}
          type={'submit'}
          variant={'text'}
        >
          Save
        </Button>
      </div>
      <PostSlider className={'mt-[19px] mb-3 px-9'} />
      <div className={'flex items-center gap-3 w-full mb-6'}>
        <Link
          href={PathService.generatePath(PublicPaths.userProfile, {
            userId: post?.ownerId,
          })}
        >
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={post?.avatarOwner || anonymous}
            width={36}
          />
        </Link>
        <Typography variant={'h3'}>{post?.userName}</Typography>
      </div>
      <div className={'w-full'}>
        <FormTextArea
          className={'h-[120px] resize-none'}
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
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </form>
  )
}
