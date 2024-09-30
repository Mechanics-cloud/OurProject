import { Select, SelectItem } from '@/common'

type Props = {
  onPageSizeValue: (value: string) => void
  pageSize: number
}

export const CountToShow = ({ onPageSizeValue, pageSize }: Props) => {
  const pageSizes = [10, 20, 30, 50, 100]

  return (
    <div className={'flex gap-1 text-sm items-center'}>
      <span>Show</span>
      <Select
        onValueChange={onPageSizeValue}
        placeholder={pageSize}
      >
        {pageSizes.map((size, index) => (
          <SelectItem
            key={index}
            value={`${size}`}
          >
            {size}
          </SelectItem>
        ))}
      </Select>
      <span>on page</span>
    </div>
  )
}
