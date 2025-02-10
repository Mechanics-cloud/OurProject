import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  PathService,
  PublicPaths,
  Typography,
  UserMiniLink,
} from '@/common'
import { maxDescriptionLength } from '@/common/constants'
import {
  CancelEditModal,
  EditDescription,
  PostSlider,
  useEditMode,
} from '@/features/posts'

export const MobileEdit = () => {
  const {
    closeConfirmModal,
    control,
    description,
    isDirty,
    isModalOpen,
    isSubmitting,
    onCloseClick,
    onSubmit,
    post,
    stopEditing,
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
          {t.post.cancel}
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
          {t.post.save}
        </Button>
      </div>
      <PostSlider className={'mt-[19px] mb-3 px-9'} />
      <UserMiniLink
        className={'flex items-center gap-3 w-full mb-6'}
        href={PathService.generatePath(PublicPaths.userProfile, {
          userId: post?.ownerId,
        })}
        name={post?.userName!}
        src={post?.avatarOwner || anonymous}
      />
      <EditDescription
        control={control}
        description={description}
        label={t.post.editDescription}
        maxLength={maxDescriptionLength}
        maxLengthMessage={t.post.maxLengthMessage}
        name={'description'}
      />
      <CancelEditModal
        onCancelEdit={stopEditing}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </form>
  )
}
