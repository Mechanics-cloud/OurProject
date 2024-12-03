import { MaxPhotoCount } from '@/features/createPost/model/constants'

export const isCanAddPhoto = (totalCount: number) => {
  return totalCount !== MaxPhotoCount
}
