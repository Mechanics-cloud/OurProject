import React from 'react'

import { Post, PostModal, getPublicPostInfo } from '@/features/posts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

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
  return (
    <PostModal
      comments={comments}
      post={post}
    />
  )
}

export default PostView
