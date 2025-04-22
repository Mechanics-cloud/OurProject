import { SearchOutline } from '@/assets/icons'
import { Typography } from '@/common'

type Props = { onFindUserFromHistory: (value: string) => void; query: string }
export const SearchHistoryItem = ({ onFindUserFromHistory, query }: Props) => {
  const onClick = () => {
    onFindUserFromHistory(query)
  }

  return (
    <div
      className={
        'cursor-pointer hover:bg-dark-100 flex items-center justify-start gap-4 w-full px-4 py-2 rounded-lg'
      }
      onClick={onClick}
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
}
