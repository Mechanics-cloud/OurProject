import { ArrowIosForward } from '@/assets/icons/filledIcons'
import { ArrowIosBackOutline } from '@/assets/icons/outlineIcons'
import { Tooltip, useTranslation } from '@/common'
import { CountToShow } from '@/common/components/pagination/CountToShow'
import { PaginationRangeButtons } from '@/common/components/pagination/PaginationRangeButtons'
import { usePaginationRange } from '@/common/components/pagination/hooks/usePaginationRange'
import { cn } from '@/common/utils/cn'

import { PageButton } from './PageButton'

type Props = {
  currentPage: number
  onPageChange: (page: number) => void
  onPageSize: (value: number) => void
  pageSize: number
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  currentPage,
  onPageChange,
  onPageSize,
  pageSize,
  siblingCount = 1,
  totalItemsCount,
}: Props) => {
  const paginationRange = usePaginationRange({
    currentPage,
    pageSize,
    siblingCount,
    totalItemsCount,
  })
  const { t } = useTranslation()

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const onPageSizeValue = (value: string) => {
    onPageSize(+value)
    onPageChange(1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  const isBackArrowDisabled = currentPage === 1
  const isForwardArrowDisabled = currentPage === lastPage

  return (
    <div className={'flex gap-8'}>
      <ul className={'flex gap-x-3 align-middle'}>
        <li className={'flex align-middle'}>
          <Tooltip title={t.basic.pagination.goBack}>
            <PageButton
              disabled={isBackArrowDisabled}
              onClick={onPrevious}
            >
              <ArrowIosBackOutline
                className={cn(
                  `h-4 w-4 ${isBackArrowDisabled && 'text-dark-100'}`
                )}
              />
              <span className={'sr-only'}>{t.basic.pagination.goBack}</span>
            </PageButton>
          </Tooltip>
        </li>
        <PaginationRangeButtons
          currentPage={currentPage}
          onPageChange={onPageChange}
          paginationRange={paginationRange}
        />
        <li className={'flex align-middle'}>
          <Tooltip title={t.basic.pagination.goForward}>
            <PageButton
              disabled={isForwardArrowDisabled}
              onClick={onNext}
            >
              <ArrowIosForward
                className={cn(
                  `h-4 w-4 ${isForwardArrowDisabled && 'text-dark-100'}`
                )}
              />
              <span className={'sr-only'}>{t.basic.pagination.goForward}</span>
            </PageButton>
          </Tooltip>
        </li>
      </ul>
      <CountToShow
        onPageSizeValue={onPageSizeValue}
        pageSize={pageSize}
      />
    </div>
  )
}
