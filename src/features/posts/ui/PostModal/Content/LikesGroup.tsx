import React, { useEffect, useState } from 'react'

import {
  Avatar,
  Nullable,
  PathService,
  PublicPaths,
  Typography,
  getPluralForm,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { Likes, LikesModal, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

export const LikesGroup = observer(() => {
  const { t } = useTranslation()
  const { likeStore, postStore } = usePostStore()
  const { getLikes, items, totalCount } = likeStore
  const { user } = generalStore
  const { isModalOpen, onModalClose, openModal } = useModal()
  const [search, setSearch] = useState('')
  const [likeUsers, setLikeUsers] = useState<Nullable<Likes[]>>(items)

  useEffect(() => {
    if (postStore.post?.id && user) {
      getLikes(postStore.post.id)
    }
  }, [postStore.post?.id, user, getLikes])

  useEffect(() => {
    if (items) {
      setLikeUsers(items)
    }
  }, [items])

  useEffect(() => {
    if (search) {
      const filteredLikesUsers = likeUsers?.filter((users) =>
        users.userName.startsWith(search)
      )

      filteredLikesUsers && setLikeUsers(filteredLikesUsers)
    } else {
      setLikeUsers(items)
    }
  }, [items, likeUsers, search])

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
        <LikesModal
          isModalOpen={isModalOpen}
          likeUsers={likeUsers}
          onModalClose={onModalClose}
          search={search}
          setSearch={setSearch}
        />
      )}
    </div>
  )
})
