export const PublicProfileEndpoints = {
  publicPosts: (userId: number, endCursorPostId: number) =>
    `/v1/public-posts/user/${userId}/${endCursorPostId}`,
  publicProfile: (profileId: string) => `/v1/public-user/profile/${profileId}`,
}
