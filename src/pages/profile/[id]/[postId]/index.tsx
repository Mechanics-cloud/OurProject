import React from 'react'

import { Paths } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { generalStore } from '@/core/store'
import { Post, PostModal, getPublicPostInfo } from '@/features/posts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/navigation'

export const getServerSideProps = (async (context) => {
  const { postId } = context.params || {}
  const { comments, post } = await getPublicPostInfo(Number(postId))

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      comments,
      post,
    },
  }
}) satisfies GetServerSideProps<{ post: Post }>

const PostView = ({
  comments,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const onNavigateUserProfile = () =>
    router.replace(Paths.profileLink(generalStore.user?.userId))

  return (
    <PostModal
      comments={comments}
      onClose={onNavigateUserProfile}
      post={post}
    />
  )
}

export default withProtection(PostView, { isPublic: false })
