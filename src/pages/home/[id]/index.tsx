import React from 'react'

import { Paths } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { Post, PostModal, getPublicPostInfo } from '@/features/posts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/navigation'

export const getServerSideProps = (async (context) => {
  const { id } = context.params || {}
  const { comments, post } = await getPublicPostInfo(Number(id))

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

  const onNavigateHome = () => router.replace(Paths.home)

  return (
    <PostModal
      comments={comments}
      onClose={onNavigateHome}
      post={post}
    />
  )
}

export default withProtection(PostView, { isPublic: true })
