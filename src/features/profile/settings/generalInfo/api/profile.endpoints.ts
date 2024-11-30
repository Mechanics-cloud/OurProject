export const ProfileEndpoints = {
  avatar: '/v1/users/profile/avatar',
  locations: '/locations.json',
  posts: (userName: string) => {
    return `/v1/posts/${userName}`
  },
  profile: '/v1/users/profile',
}
