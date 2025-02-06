import React from 'react'

import { Close } from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  PathService,
  PublicPaths,
  Typography,
  UserMiniLink,
} from '@/common'
import { CancelEditModal, PostSlider } from '@/features/posts'
import { EditDescription } from '@/features/posts/ui/EditModal/EditDescription'
import { useEditMode } from '@/features/posts/ui/EditModal/useEditMode'
import { observer } from 'mobx-react-lite'

export const Edit = observer(() => {
  const {
    closeConfirmModal,
    control,
    description,
    isDirty,
    isModalOpen,
    isSubmitting,
    maxDescriptionLength,
    onCloseClick,
    onSubmit,
    post,
    stopEditing,
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
            <UserMiniLink
              className={'flex items-center gap-3'}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId: post?.ownerId,
              })}
              name={post?.userName!}
              src={post?.avatarOwner || anonymous}
            />
            <form
              className={'flex flex-col justify-between h-full'}
              onSubmit={onSubmit}
            >
              <EditDescription
                control={control}
                description={description}
                label={t.post.editDescription}
                maxLength={maxDescriptionLength}
                maxLengthMessage={t.post.maxLengthMessage}
                name={'description'}
              />
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
        onCancelEdit={stopEditing}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </div>
  )
})
