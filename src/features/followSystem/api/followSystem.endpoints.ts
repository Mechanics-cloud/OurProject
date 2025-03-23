export const followSystemEndpoints = {
  deleteFollower: (userId: number) => `/v1/users/follower/${userId}`,
  following: '/v1/users/following',
  getFollowers: (userName: string) => `/v1/users/${userName}/followers`,
  getFollowing: (userName: string) => `/v1/users/${userName}/following`,
  getProfile: (userName: string) => `/v1/users/${userName}`,
}
