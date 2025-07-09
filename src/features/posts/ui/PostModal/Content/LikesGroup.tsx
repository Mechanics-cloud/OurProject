import React, { useEffect } from 'react'

import {
  PathService,
  PublicPaths,
  Typography,
  UserMiniLink,
  getPluralForm,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { LikesModal, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'

export const LikesGroup = observer(() => {
  const { t } = useTranslation()
  const { likeStore, postStore } = usePostStore()
  const { isModalOpen, onModalClose, openModal } = useModal()
  const { user } = generalStore

  useEffect(() => {
    if (postStore.post?.id && user) {
      likeStore.getLikes(postStore.post.id)
    }
  }, [postStore.post?.id, user, likeStore.getLikes, likeStore])

  return (
    <div className={'flex items-center min-h-9'}>
      {likeStore.items && !!likeStore.items.length && (
        <div className={'relative flex items-center'}>
          {likeStore.items?.slice(0, 3).map((item, index, array) => (
            <UserMiniLink
              className={`relative z-${(array.length - index) * 10}`}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId: item.userId,
              })}
              key={item.id}
              src={item.avatars[0]?.url}
              style={{
                left: `-${index * 18}px`,
              }}
            />
          ))}
        </div>
      )}
      <Typography
        className={'ml-2 cursor-pointer'}
        onClick={openModal}
        variant={'reg14'}
      >
        {getPluralForm({ key: t.post.likes, value: likeStore.totalCount })}
      </Typography>
      {isModalOpen && (
        <LikesModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
        />
      )}
    </div>
  )
})
