import { CircleLoader, Pagination } from '@/common'
import { useSearchList } from '@/features/searchUser/model/useSearchList'
import { SearchUserInputAndTitle } from '@/features/searchUser/ui/SearchUserInputAndTitle'
import { observer } from 'mobx-react-lite'

export const SearchUser = observer(() => {
  const {
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
  } = useSearchList()

  return (
    <div
      className={
        'w-full h-[calc(theme(height.headCalc)-82px)] flex flex-col relative pb-10'
      }
    >
      <SearchUserInputAndTitle
        inputText={inputText}
        loading={loading}
        ref={inputRef}
        resetUsersInfo={resetUsersInfo}
        setInputText={setInputText}
      />
      {loading ? (
        <CircleLoader
          className={'pt-0 w-full h-full flex justify-center items-center'}
        />
      ) : (
        SearchUserContent
      )}
      {usersInfo && (
        <Pagination
          className={
            'flex items-center justify-center absolute bottom-0 right-0 left-0'
          }
          currentPage={currentPage}
          onPageChange={onPageChange}
          onPageSize={onPageSize}
          pageSize={pageSize}
          totalItemsCount={usersInfo.totalCount}
        />
      )}
    </div>
  )
})
