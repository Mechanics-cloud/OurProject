import { ChangeEvent, memo } from 'react'

import { SearchOutline } from '@/assets/icons'
import { cn } from '@/common'

type Props = {
  className?: string
  search: string
  setSearch: (search: string) => void
}
export const Search = memo(({ className, search, setSearch }: Props) => {
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  return (
    <div className={cn('relative flex items-center mb-6', className)}>
      <SearchOutline className={'absolute left-5 fill-light-900'} />
      <input
        className={
          'w-full border-2 border-dark-100 bg-transparent py-1.5 px-8 placeholder:text-light-900 placeholder:text-[16px]'
        }
        onChange={onValueChange}
        placeholder={'Search'}
        value={search}
      />
    </div>
  )
})
