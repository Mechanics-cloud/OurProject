import { FiltersState } from '@/features/createPost'

export const prepareFilterStyles = (filterSettings: FiltersState): string => {
  return Object.entries(filterSettings).reduce((acc, [filter, value]) => {
    const valueWithUnit = filter === 'hue-rotate' ? `${value}deg` : value

    return acc + `${filter}(${valueWithUnit}) `
  }, '')
}
