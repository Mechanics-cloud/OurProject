import { Button, Typography, cn, useTranslation } from '@/common'
import { SearchHistoryItem } from '@/features/searchUser/ui/searchHistory/SearchHistoryItem'

type Props = {
  deleteHistory: () => void
  historyQueries: string[]
  onFindUserFromHistory: (value: string) => void
}
export const SearchHistory = ({
  deleteHistory,
  historyQueries,
  onFindUserFromHistory,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'pt-8 w-full h-full flex flex-col justify-start items-start'
      )}
    >
      <div className={'flex justify-between items-center w-full'}>
        <Typography variant={'h2'}>{t.search.recentRequests}</Typography>
        <Button
          className={cn('p-0', !historyQueries.length && 'hidden')}
          onClick={deleteHistory}
          variant={'text'}
        >
          {t.search.deleteHistory}
        </Button>
      </div>
      {historyQueries.length ? (
        <div
          className={
            'mt-4 w-full flex flex-col justify-center items-start gap-2'
          }
        >
          {historyQueries.map((query, i) => {
            return (
              <SearchHistoryItem
                key={i}
                onFindUserFromHistory={onFindUserFromHistory}
                query={query}
              />
            )
          })}
        </div>
      ) : (
        <div
          className={'w-full flex flex-col items-center justify-center mt-20'}
        >
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'bold16'}
          >
            {t.search.emptyRecentRequestsTitle}
          </Typography>
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'reg14'}
          >
            {t.search.emptyRecentRequestsText}
          </Typography>
        </div>
      )}
    </div>
  )
}
