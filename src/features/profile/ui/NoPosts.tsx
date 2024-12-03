import * as React from 'react'

import { Button, Typography, useModal, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import { useUserId } from '@/features/profile/model/UserIdProvider'
import Image from 'next/image'

import noPostImage from '/src/assets/images/noUserPosts.svg'

export const NoPosts = () => {
  const { t } = useTranslation()
  const isPersonalPage = useUserId() === generalStore.user?.userId

  const {
    isModalOpen: isNewPostModalOpen,
    onModalClose: onNewPostModalClose,
    openModal: openNewPostModal,
  } = useModal()

  return (
    <div className={'flex flex-col gap-8'}>
      <Image
        alt={t.profilePage.noPosts.alt}
        className={'w-[700px] m-auto pt-16 mt-16 opacity-90'}
        src={noPostImage}
      />
      <Typography
        className={'m-auto text-center font-normal'}
        variant={'h1'}
      >
        {isPersonalPage
          ? t.profilePage.noPosts.userText
          : t.profilePage.noPosts.strangeText}
      </Typography>
      {isPersonalPage && (
        <Button
          className={'text-center m-auto'}
          onClick={openNewPostModal}
        >
          {t.profilePage.noPosts.button}
        </Button>
      )}
      <NewPostDialog
        onClose={onNewPostModalClose}
        onOpenChange={onNewPostModalClose}
        open={isNewPostModalOpen}
      />
    </div>
  )
}
