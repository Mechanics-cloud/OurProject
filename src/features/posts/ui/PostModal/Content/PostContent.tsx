import React, { useState } from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  Button,
  PathService,
  PublicPaths,
  ScrollArea,
  Typography,
  timeAgo,
} from '@/common'
import {
  Comment,
  CommentItem,
  Description,
  usePostContent,
} from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  screenSize?: number
}

export const PostContent = observer(({ screenSize }: Props) => {
  const {
    endRef,
    isAvatarHidden,
    isMobile,
    items: comments,
    mapComments,
    onChangeCommentLike,
    postStore,
    router,
    startRef,
    t,
    user,
  } = usePostContent(screenSize)

  const [isCommentsVisible, setIsCommentsVisible] = useState(false)

  return (
    <ScrollArea className={'border-b border-dark-100 box-border h-full'}>
      <div
        className={'flex-col overflow-y-hidden grow justify-end py-5 md:px-6 '}
        ref={startRef}
      >
        {postStore.post?.description && (
          <Description
            avatarOwner={postStore.post.avatarOwner}
            description={postStore.post.description}
            isAvatarHidden={isAvatarHidden}
          />
        )}
        {mapComments ? (
          mapComments?.map((comment: Comment) => (
            <CommentItem
              alt={`${comment.from.username} photo image`}
              className={'mb-4'}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId: comment.from.id,
              })}
              isAvatarHidden={isAvatarHidden}
              isLike={user ? comment.isLiked : null}
              key={comment.id}
              likes={comment.likeCount ? `Likes: ${comment.likeCount}` : ''}
              name={comment.from.username}
              onLike={() => onChangeCommentLike(comment)}
              src={comment.from.avatars[0]?.url}
              text={comment.content}
              time={timeAgo(comment.createdAt, router.locale) || t.post.now}
            />
          ))
        ) : (
          <p>{t.post.noComments}</p>
        )}
        {isMobile && (
          <>
            <Button
              className={'w-full h-6 mb-4 text-light-900 justify-start px-0'}
              onClick={() => setIsCommentsVisible(true)}
              variant={'text'}
            >
              {`View all comments (${comments?.length})`}
            </Button>
            <div
              className={`fixed bottom-0 left-0 w-full h-full bg-dark-900 transition-all duration-500 ease-in-out z-10 py-20 px-4 ${
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
                  className={'absolute left-4 w-6 h-6'}
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
                  onLike={() => onChangeCommentLike(comment)}
                  src={comment.from.avatars[0]?.url}
                  text={comment.content}
                  time={timeAgo(comment.createdAt, router.locale) || t.post.now}
                />
              ))}
            </div>
          </>
        )}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
})
