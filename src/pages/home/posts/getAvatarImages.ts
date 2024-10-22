import { responseErrorHandler } from '@/common/utils/responseErrorHandler'

import { postsApi } from './posts.api'

export const getAvatarImages = async (
  postId: number
): Promise<null | string[]> => {
  let firstThreeAvatars = null

  try {
    const { items } = await postsApi.getPostLikes({ postId })

    if (items.length !== 0 && items[0].avatars.length !== 0) {
      firstThreeAvatars = items
        .slice(0, 3)
        .filter(
          (item) =>
            item !== undefined &&
            item.avatars &&
            item.avatars[0] &&
            item.avatars[0].url
        )
        .map((item) => item.avatars[0]?.url)
    }
  } catch (error) {
    responseErrorHandler(error)
  }

  return firstThreeAvatars
}
