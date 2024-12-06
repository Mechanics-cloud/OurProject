export const PostsRequestEndpoints = {
  idComments: (postId: number) => `/v1/posts/${postId}/comments`,
  idLikeStatus: (postId: number) => `/v1/posts/${postId}/like-status`,
  idLikes: (postId: number) => `/v1/posts/${postId}/likes`,
}
