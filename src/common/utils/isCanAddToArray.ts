import { MaxPostImagesCount } from '@/features/createPost/model/constants'

/**
 *
 * @param limit - Maximum possible value
 * @param value - Current value
 */
export const isLimitExceeded = ({
  limit = MaxPostImagesCount,
  value,
}: {
  limit?: number
  value: number
}) => {
  return value !== limit
}
