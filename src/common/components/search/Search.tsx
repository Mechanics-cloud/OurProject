import { SearchOutline } from '@/assets/icons'

export const Search = () => {
  return (
    <div className={'relative flex items-center mb-6'}>
      <SearchOutline className={'absolute left-2 fill-light-900'} />
      <input
        className={
          'w-full border-2 border-dark-100 bg-transparent py-1.5 px-8 placeholder:text-light-900'
        }
        placeholder={'Search'}
      />
    </div>
  )
}
