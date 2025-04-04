import { getFromLocalStorage, setToLocalStorage } from '@/common'
import {
  MAX_SEARCH_HISTORY_ACCOUNTS,
  MAX_SEARCHES_PER_USER,
} from '@/common/constants'

export function addSearchQueryToLocalStorage(
  newQuery: string,
  ownerId: number
) {
  const storedSearches = getFromLocalStorage('searchQueries')
  const queries: Record<string, string[]> = storedSearches
    ? JSON.parse(storedSearches)
    : {}
  const keys = Object.keys(queries)

  if (!queries[ownerId] && keys.length >= MAX_SEARCH_HISTORY_ACCOUNTS) {
    delete queries[keys.toReversed()[0]]
  }

  queries[ownerId] = queries[ownerId]
    ? queries[ownerId].filter((query) => query !== newQuery)
    : []

  if (queries[ownerId].length >= MAX_SEARCHES_PER_USER) {
    queries[ownerId].shift()
  }

  queries[ownerId].push(newQuery)

  setToLocalStorage('searchQueries', JSON.stringify(queries))

  return queries[ownerId].toReversed()
}
