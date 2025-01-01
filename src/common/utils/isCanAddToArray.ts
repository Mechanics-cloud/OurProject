import { MaxPostImagesCount } from '@/features/createPost/model/constants'

export const isCanAddToArray = ({
  maxCount = MaxPostImagesCount,
  totalCount,
}: {
  maxCount?: number
  totalCount: number
}) => {
  return totalCount !== maxCount
}
