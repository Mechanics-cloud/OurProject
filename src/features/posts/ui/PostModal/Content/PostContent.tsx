import React from 'react'

import {
  PathService,
  PublicPaths,
  ScrollArea,
  getPluralForm,
  timeAgo,
} from '@/common'
import {
  Comment,
  CommentItem,
  Description,
  usePostContent,
} from '@/features/posts'
import { ViewAllComments } from '@/features/posts/ui/Mobile/ViewAllComments'
import { observer } from 'mobx-react-lite'

type Props = {
  screenSize?: number
}

export const PostContent = observer(({ screenSize }: Props) => {
  const {
    endRef,
    isMobile,
    isTablet,
    items: comments,
    mapComments,
    onChangeCommentLike,
    postStore,
    router,
    startRef,
    t,
    user,
  } = usePostContent(screenSize)

  return (
    <ScrollArea className={'border-b border-dark-100 box-border h-full block'}>
      <div
        className={'flex-col overflow-y-hidden grow justify-end py-5 lg:px-6 '}
        ref={startRef}
      >
        {postStore.post?.description && (
          <Description
            avatarOwner={postStore.post.avatarOwner}
            description={postStore.post.description}
            isAvatarHidden={isMobile}
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
              isAvatarHidden={isMobile}
              isLike={user ? comment.isLiked : null}
              key={comment.id}
              likes={
                comment.likeCount
                  ? getPluralForm({
                      key: t.post.likesComments,
                      value: comment.likeCount,
                    })
                  : ''
              }
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
        {isTablet && (
          <ViewAllComments
            comments={comments}
            onLike={onChangeCommentLike}
            user={user}
          />
        )}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
})
