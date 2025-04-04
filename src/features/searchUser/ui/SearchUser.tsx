import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { CloseOutline, SearchOutline } from '@/assets/icons'
import {
  Button,
  CircleLoader,
  Nullable,
  ScrollArea,
  TextField,
  Typography,
  cn,
  getFromLocalStorage,
  tryCatch,
  useDebounce,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { UsersInfoDTO, searchUserApi } from '@/features/searchUser/api'
import { addSearchQueryToLocalStorage } from '@/features/searchUser/model/helpers'
import { UserListItem } from '@/features/searchUser/ui/UserListItem'
import { observer } from 'mobx-react-lite'

export const SearchUser = observer(() => {
  const { t } = useTranslation()
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [usersInfo, setUsersInfo] = useState<Nullable<UsersInfoDTO>>(null)
  const [historyQueries, setHistoryQueries] = useState<string[]>([])
  const debounceValue = useDebounce(inputText)
  const userId = generalStore.user?.userId
  const inputRef = useRef<HTMLInputElement>(null)

  const onFindChat = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setUsersInfo(null)
    }
    setInputText(e.currentTarget.value)
  }

  useEffect(() => {
    const searchUserHistory = getFromLocalStorage('searchQueries')

    if (searchUserHistory && userId) {
      const allHistory = JSON.parse(searchUserHistory)

      setHistoryQueries(allHistory[userId] || [])
    }
  }, [userId])

  useEffect(() => {
    const controller = new AbortController()
    const fetchUserInfo = async () => {
      setLoading(true)
      if (debounceValue.trim() && userId) {
        const { data, error } = await tryCatch(
          searchUserApi.getUserByName({
            search: debounceValue,
            signal: controller.signal,
          })
        )

        if (data) {
          const resultItems = data.items.filter((el) => el.id !== userId)

          setUsersInfo({ ...data, items: resultItems })
          const updatedQueries = addSearchQueryToLocalStorage(
            debounceValue,
            userId
          )

          setHistoryQueries(updatedQueries)
        }
      }
      setLoading(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    fetchUserInfo()

    return () => {
      controller.abort()
    }
  }, [debounceValue, userId])

  return (
    <div
      className={'w-full h-[calc(theme(height.headCalc)-82px)] flex flex-col'}
    >
      <div>
        <Typography
          className={'mt-9'}
          variant={'h1'}
        >
          Search User
        </Typography>
        <div className={'relative'}>
          <TextField
            autoFocus
            bottomMarginForError={false}
            className={'w-full mt-3'}
            disabled={loading}
            innerInputClassName={'pr-8'}
            label={''}
            onChange={onFindChat}
            placeholder={'Search...'}
            ref={inputRef}
            type={'search'}
            value={inputText}
          />
          <Button
            className={
              'p-0 absolute right-2 top-1/2 -translate-y-1/2 text-light-100'
            }
            disabled={loading}
            onClick={() => {
              setInputText('')
              setUsersInfo(null)
              inputRef.current?.focus()
            }}
            variant={'text'}
          >
            <CloseOutline
              height={20}
              width={20}
            />
          </Button>
        </div>
      </div>
      {loading ? (
        <CircleLoader
          className={'pt-0 w-full h-full flex justify-center items-center'}
        />
      ) : (
        <>
          {usersInfo ? (
            <ScrollArea
              className={'w-full mt-8'}
              isPaddingRight={false}
            >
              {usersInfo.items.map((el) => {
                return (
                  <UserListItem
                    item={el}
                    key={el.id}
                    set={() => setLoading(true)}
                  />
                )
              })}
            </ScrollArea>
          ) : (
            <div
              className={cn(
                'pt-8 w-full h-full flex flex-col justify-start items-start'
              )}
            >
              <Typography variant={'h2'}>Recent requests</Typography>
              {historyQueries.length ? (
                <div
                  className={
                    'mt-4 w-full flex flex-col justify-center items-start gap-2'
                  }
                >
                  {historyQueries.map((query, i) => {
                    return (
                      <div
                        className={
                          'cursor-pointer hover:bg-dark-100 flex items-center justify-start gap-4 w-full px-4 py-2 rounded-lg'
                        }
                        key={i}
                        onClick={() => {
                          setLoading(true)
                          setInputText(query)
                        }}
                      >
                        <div className={'shrink-0'}>
                          <SearchOutline
                            height={20}
                            width={20}
                          />
                        </div>
                        <Typography
                          className={'truncate'}
                          variant={'reg14'}
                        >
                          {query}
                        </Typography>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div
                  className={
                    'w-full flex flex-col items-center justify-center mt-20'
                  }
                >
                  <Typography
                    className={'text-light-900 text-pretty text-center'}
                    variant={'bold16'}
                  >
                    Oops! This place looks empty!
                  </Typography>
                  <Typography
                    className={'text-light-900 text-pretty text-center'}
                    variant={'reg14'}
                  >
                    No recent requests
                  </Typography>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {usersInfo?.items.length === 0 && (
        <div
          className={'w-full flex flex-col items-center justify-center mt-20'}
        >
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'bold16'}
          >
            Oops! No users found!
          </Typography>
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'reg14'}
          >
            Please repeat the request with a different name.
          </Typography>
        </div>
      )}
    </div>
  )
})
