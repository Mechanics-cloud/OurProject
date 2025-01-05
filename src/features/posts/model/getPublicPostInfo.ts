import { Nullable, PathService } from '@/common'
import { Post, PostComments, PublicPostsEndpoints } from '@/features/posts'

type ReturnType = {
  comments: Nullable<PostComments>
  post: Nullable<Post>
}

export const getPublicPostInfo = async (id: number): Promise<ReturnType> => {
  const postEndpoint = PublicPostsEndpoints.idPost(id)
  const postResponse = await fetch(PathService.generateServerPath(postEndpoint))
  const post = await postResponse.json()

  const params = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

  const commentsEndpoint = PublicPostsEndpoints.idComments(
    id,
    PathService.getQueryParams(params)
  )
  const commentsResponse = await fetch(
    PathService.generateServerPath(commentsEndpoint)
  )
  const comments = await commentsResponse.json()

  return {
    comments: comments ?? null,
    post: post ?? null,
  }
}
