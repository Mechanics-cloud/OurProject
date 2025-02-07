import React, { useState } from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  Button,
  Nullable,
  PathService,
  PublicPaths,
  Typography,
  timeAgo,
  useTranslation,
} from '@/common'
import { Profile } from '@/features/auth'
import { Comment, CommentItem } from '@/features/posts'
import { useRouter } from 'next/router'

type Props = {
  comments: Nullable<Comment[]>
  isLike?: boolean
  onLike: (comment: Comment) => void
  user: Nullable<Profile>
}
export const ViewAllComments = ({ comments, onLike, user }: Props) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <Button
        className={'w-full h-6 mb-4 text-light-900 justify-start px-0'}
        onClick={() => setIsCommentsVisible(true)}
        variant={'text'}
      >
        {`View all comments (${comments?.length})`}
      </Button>
      <div
        className={`fixed bottom-0 left-0 w-full h-full bg-dark-900 transition-all duration-500 ease-in-out z-10 py-20 px-6 md:px-10 ${
          isCommentsVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`}
      >
        <Typography
          className={'mb-6 flex items-center justify-center w-full'}
          variant={'h2'}
        >
          <ArrowBackOutline
            className={'absolute left-6 w-6 h-6 md:left-10'}
            onClick={() => setIsCommentsVisible(false)}
          />
          Comments
        </Typography>
        {comments?.map((comment: Comment) => (
          <CommentItem
            alt={`${comment.from.username} photo image`}
            className={'mb-4'}
            href={PathService.generatePath(PublicPaths.userProfile, {
              userId: comment.from.id,
            })}
            isAvatarHidden={false}
            isLike={user ? comment.isLiked : null}
            key={comment.id}
            likes={comment.likeCount ? `Likes: ${comment.likeCount}` : ''}
            name={comment.from.username}
            onLike={() => onLike(comment)}
            src={comment.from.avatars[0]?.url}
            text={comment.content}
            time={timeAgo(comment.createdAt, router.locale) || t.post.now}
          />
        ))}
      </div>
    </>
  )
}
