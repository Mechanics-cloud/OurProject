import { responseErrorHandler } from '@/common/utils/responseErrorHandler'

import { postsApi } from './posts.api'
import postsStore from './postsStore'

export const getAvatarImages = async (
  postId: number
): Promise<null | string[]> => {
  let allLikes = null
  let firstThreeAvatars = null

  try {
    allLikes = await postsApi.postIdLikes({ postId })
    if (allLikes.items) {
      firstThreeAvatars = allLikes.items
        .slice(0, 3)
        .map((item) => item.avatars[0].url)
    }
  } catch (error) {
    responseErrorHandler(error)
  }

  return firstThreeAvatars
}
// export const getAvatarImages = async (
//   postId: number
// ): Promise<[] | string[]> => {
//   try {
//     await postsStore.getLikesPosts(postId)
//     const firstThreeAvatars = data.items
//       .slice(0, 3)
//       .map((item) => item.avatars[0].url)

//     return firstThreeAvatars
//   } catch (error) {
//     console.error('Error fetching post likes:', error)

//     return []
//   }
// }
