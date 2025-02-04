import { PathService } from '@/common'

export const PostsRequestEndpoints = {
  changeCommentLike: '/v1/posts/:postId/comments/:commentId/like-status',
  idComments: (postId: number, queryParams?: string) =>
    PathService.generateQueryPath(`/v1/posts/${postId}/comments`, queryParams),
  idLikeStatus: (postId: number) => `/v1/posts/${postId}/like-status`,
  idLikes: (postId: number, queryParams?: string) =>
    PathService.generateQueryPath(`/v1/posts/${postId}/likes`, queryParams),

  idPost: (postId: number) => `/v1/posts/${postId}`,
}

export const PublicPostsEndpoints = {
  idComments: (postId: number, queryParams?: string) =>
    PathService.generateQueryPath(
      `/v1/public-posts/${postId}/comments`,
      queryParams
    ),
  idPost: (postId: number) => `/v1/public-posts/${postId}`,
}
