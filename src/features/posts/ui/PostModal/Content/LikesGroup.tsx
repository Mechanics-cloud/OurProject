import React, { useEffect } from 'react'

import {
  Avatar,
  PathService,
  Paths,
  Typography,
  getPluralForm,
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
              href={PathService.generatePath(Paths.userProfile, {
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
        className={'ml-2'}
        variant={'reg14'}
      >
        {getPluralForm({ key: t.post.likes, value: totalCount })}
      </Typography>
    </div>
  )
})
