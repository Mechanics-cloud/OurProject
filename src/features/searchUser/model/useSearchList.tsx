import { useEffect, useRef, useState } from 'react'

import { Nullable, getFromLocalStorage, tryCatch, useDebounce } from '@/common'
import { generalStore } from '@/core/store'
import { UsersInfoDTO, searchUserApi } from '@/features/searchUser/api'
import {
  addSearchQueryToLocalStorage,
  deleteSearchQueryFromLocalStorage,
} from '@/features/searchUser/model/helpers'
import { SearchHistory } from '@/features/searchUser/ui/searchHistory/SearchHistory'
import { UsersList } from '@/features/searchUser/ui/usersList/UsersList'

export const useSearchList = () => {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [usersInfo, setUsersInfo] = useState<Nullable<UsersInfoDTO>>(null)
  const [historyQueries, setHistoryQueries] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedValue = useDebounce(inputText, 1000)
  const userId = generalStore.user?.userId

  const inputRef = useRef<HTMLInputElement>(null)
  const isReset = useRef<boolean>(false)

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

  const deleteHistory = () => {
    if (!userId) {
      return
    }
    setHistoryQueries([])
    deleteSearchQueryFromLocalStorage(userId)
    setPageSize(10)
    setCurrentPage(1)
    inputRef.current?.focus()
  }

  const resetUsersInfo = () => {
    setUsersInfo(null)
    if (pageSize !== 10 || currentPage !== 1) {
      isReset.current = true
      setPageSize(10)
      setCurrentPage(1)
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!debouncedValue) {
        return
      }

      if (isReset.current) {
        isReset.current = false

        return
      }

      setLoading(true)
      if (userId) {
        const { data } = await tryCatch(
          searchUserApi.getUserByName({
            pageNumber: currentPage,
            pageSize,
            search: debouncedValue,
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
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    fetchUserInfo()
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
    resetUsersInfo,
    setInputText,
    usersInfo,
  }
}
