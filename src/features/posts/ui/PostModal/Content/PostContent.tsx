import React from 'react'

import { PathService, PublicPaths, ScrollArea, timeAgo } from '@/common'
import {
  Comment,
  CommentItem,
  Description,
  usePostContent,
} from '@/features/posts'
import { observer } from 'mobx-react-lite'

export const PostContent = observer(() => {
  const {
    endRef,
    items: comments,
    onChangeCommentLike,
    postStore,
    router,
    startRef,
    t,
    user,
  } = usePostContent()

  return (
    <ScrollArea className={'border-b border-dark-100 box-border h-full'}>
      <div
        className={'flex-col overflow-y-hidden grow justify-end py-5 px-6 '}
        ref={startRef}
      >
        {postStore.post?.description && (
          <Description
            avatarOwner={postStore.post.avatarOwner}
            description={postStore.post.description}
          />
        )}
        {comments && comments?.length > 0 ? (
          comments.map((comment: Comment) => (
            <CommentItem
              alt={`${comment.from.username} photo image`}
              className={'mb-4'}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId: comment.from.id,
              })}
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

        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
})
