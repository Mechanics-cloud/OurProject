import React from 'react'

import { PathService, Paths } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { Post, PostModal, PublicPostsEndpoints } from '@/features/posts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/navigation'

export const getServerSideProps = (async (context) => {
  const { id } = context.params || {}
  const postId = Number(id)
  const postEndpoint = PublicPostsEndpoints.idPost(postId)
  const postResponse = await fetch(PathService.generateServerPath(postEndpoint))
  const post = await postResponse.json()

  const params = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

  const commentsEndpoint = PublicPostsEndpoints.idComments(
    postId,
    PathService.getQueryParams(params)
  )
  const commentsResponse = await fetch(
    PathService.generateServerPath(commentsEndpoint)
  )
  const comments = await commentsResponse.json()

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

  const onNavigateMainPage = () => router.replace(Paths.publicMainPage)

  return (
    <PostModal
      comments={comments}
      onClose={onNavigateMainPage}
      post={!post || post.statusCode === 404 ? null : post}
    />
  )
}

export default withProtection(PostView, { isPublic: true })
