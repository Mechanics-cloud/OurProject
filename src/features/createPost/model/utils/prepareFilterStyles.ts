import { FiltersState } from '@/features/createPost'

/**
 *
 * @param filterSettings - prepare filter styles to apply on image
 */

export const prepareFilterStyles = (filterSettings: FiltersState): string => {
  return Object.entries(filterSettings).reduce((acc, [filter, value]) => {
    const valueWithUnit = filter === 'hue-rotate' ? `${value}deg` : value

    return acc + `${filter}(${valueWithUnit}) `
  }, '')
}
