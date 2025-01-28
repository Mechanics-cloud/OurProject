import { PathService } from '@/common'
import { PublicPostInfo, PublicPostsEndpoints } from '@/features/posts'

const defaultValues = {
  comments: null,
  post: null,
}

export const getPublicPostInfo = async (
  id?: number
): Promise<PublicPostInfo> => {
  if (!id) {
    return defaultValues
  }

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
    comments: comments ?? defaultValues.comments,
    post: post ?? defaultValues.post,
  }
}
