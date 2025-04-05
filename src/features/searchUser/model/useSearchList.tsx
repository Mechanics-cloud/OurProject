import { useCallback, useEffect, useRef, useState } from 'react'

import { Nullable, getFromLocalStorage, tryCatch, useDebounce } from '@/common'
import { generalStore } from '@/core/store'
import { UsersInfoDTO, searchUserApi } from '@/features/searchUser/api'
import {
  addSearchQueryToLocalStorage,
  deleteSearchQueryFromLocalStorage,
} from '@/features/searchUser/model/helpers'
import { SearchHistory } from '@/features/searchUser/ui/searchHistory/SearchHistory'
import { UsersList } from '@/features/searchUser/ui/usersList/UsersList'

const defaultPageSize = 10
const defaultCurrentPage = 1

export const useSearchList = () => {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [usersInfo, setUsersInfo] = useState<Nullable<UsersInfoDTO>>(null)
  const [historyQueries, setHistoryQueries] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)

  const debouncedValue = useDebounce(inputText)
  const userId = generalStore.user?.userId

  const inputRef = useRef<HTMLInputElement>(null)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (page: number) => {
    setPageSize(page)
  }

  const onFindUserFromHistory = (query: string) => {
    setInputText(query)
    setLoading(true)
  }

  const resetPagination = useCallback(() => {
    setPageSize(defaultPageSize)
    setCurrentPage(defaultCurrentPage)
  }, [])

  const deleteHistory = () => {
    if (!userId) {
      return
    }
    setHistoryQueries([])
    deleteSearchQueryFromLocalStorage(userId)
    resetPagination()
    inputRef.current?.focus()
  }

  useEffect(() => {
    resetPagination()
    if (!debouncedValue) {
      setUsersInfo(null)
    }
  }, [debouncedValue, resetPagination])

  useEffect(() => {
    const controller = new AbortController()
    const fetchUserInfo = async () => {
      if (!debouncedValue) {
        return
      }

      setLoading(true)
      if (userId) {
        const { data } = await tryCatch(
          searchUserApi.getUserByName({
            pageNumber: currentPage,
            pageSize,
            search: debouncedValue,
            signal: controller.signal,
          })
        )

        if (data) {
          const resultItems = data.items.filter((el) => el.id !== userId)
          const updatedQueries = addSearchQueryToLocalStorage(
            debouncedValue,
            userId
          )

          setUsersInfo({ ...data, items: resultItems })
          setHistoryQueries(updatedQueries)
        }
      }
      setLoading(false)
    }

    fetchUserInfo()

    return () => {
      controller.abort()
    }
  }, [currentPage, debouncedValue, pageSize, userId])

  useEffect(() => {
    const searchUserHistory = getFromLocalStorage('searchQueries')

    if (!searchUserHistory || !userId) {
      return
    }
    const allHistory = JSON.parse(searchUserHistory)

    if (allHistory[userId]) {
      setHistoryQueries(allHistory[userId])
    }
  }, [userId])

  const SearchUserContent = usersInfo ? (
    <UsersList usersInfo={usersInfo} />
  ) : (
    <SearchHistory
      deleteHistory={deleteHistory}
      historyQueries={historyQueries}
      onFindUserFromHistory={onFindUserFromHistory}
    />
  )

  return {
    SearchUserContent,
    currentPage,
    inputRef,
    inputText,
    loading,
    onPageChange,
    onPageSize,
    pageSize,
    setInputText,
    usersInfo,
  }
}
