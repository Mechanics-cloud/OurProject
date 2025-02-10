import { Select, SelectItem, useTranslation } from '@/common'

type Props = {
  onPageSizeValue: (value: string) => void
  pageSize: number
}

export const CountToShow = ({ onPageSizeValue, pageSize }: Props) => {
  const { t } = useTranslation()
  const pageSizes = [10, 20, 30, 50, 100]

  return (
    <div className={'flex gap-1 text-sm items-center'}>
      <span>{t.basic.pagination.show}</span>
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
      <span>{t.basic.pagination.onPage}</span>
    </div>
  )
}
