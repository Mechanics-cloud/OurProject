import React, { useEffect, useState } from 'react'

import {
  Avatar,
  Button,
  PathService,
  PublicPaths,
  Search,
  SimpleModal,
  Typography,
  UserMiniLink,
  getPluralForm,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

export const LikesGroup = observer(() => {
  const { t } = useTranslation()
  const { likeStore, postStore } = usePostStore()
  const { getLikes, items, totalCount } = likeStore
  const { user } = generalStore
  const { isModalOpen, onModalClose, openModal } = useModal()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (postStore.post?.id && user) {
      getLikes(postStore.post.id)
    }
  }, [postStore.post?.id, user, getLikes])

  return (
    <div className={'flex items-center min-h-9'}>
      {items && !!items.length && (
        <div className={'relative flex items-center'}>
          {items?.slice(0, 3).map((item, index, array) => (
            <Link
              className={`relative z-${(array.length - index) * 10}`}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId: item.userId,
              })}
              key={item.id}
              style={{
                left: `-${index * 18}px`,
              }}
            >
              <Avatar
                alt={`${item.userName} avatar`}
                key={index}
                priority
                size={36}
                src={item.avatars[0]?.url}
              />
            </Link>
          ))}
        </div>
      )}
      <Typography
        className={'ml-2 cursor-pointer'}
        onClick={openModal}
        variant={'reg14'}
      >
        {getPluralForm({ key: t.post.likes, value: totalCount })}
      </Typography>
      {isModalOpen && (
        <SimpleModal
          className={'w-[640px]'}
          onOpenChange={onModalClose}
          open={isModalOpen}
          title={'Likes'}
        >
          <Search
            className={'px-3'}
            search={search}
            setSearch={setSearch}
          />
          {items?.map((item) => (
            <div
              className={'flex items-center justify-between mb-6 px-3'}
              key={item.userId}
            >
              <UserMiniLink
                name={item.userName}
                src={item.avatars[0]?.url}
              />
              {item.userId !== user?.userId && (
                <Button
                  className={'w-[117px]'}
                  variant={item.isFollowing ? 'outline' : 'primary'}
                >
                  {item.isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </div>
          ))}
        </SimpleModal>
      )}
    </div>
  )
})
