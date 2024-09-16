import * as React from 'react'

import { ArrowBackOutline, ArrowIosBackOutline } from '@/assets/icons'
import CalendarOpen from '@/assets/icons/CalendarOutline'
import { usePagination } from '@/common/components/pagination/hooks/usePagination'
import { cn } from '@/common/utils/cn'

import { PageButton } from './PageButton'

type Props = {
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export const DOTS = 0

export const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  siblingCount = 1,
  totalCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    // <div className={'flex gap-x-3'}>
    //   <PageButton
    //     onClick={() => {}}
    //     page={1}
    //   />
    //   <PageButton
    //     onClick={() => {}}
    //     page={1}
    //     selected
    //   />
    //   <PageButton
    //     disabled
    //     onClick={() => {}}
    //     page={1}
    //   />
    // </div>
    <ul className={'flex gap-x-3'}>
      <li>
        <PageButton
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <ArrowIosBackOutline className={cn('w-5')} />
        </PageButton>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li>&#8230</li>
        }

        return (
          <li>
            <PageButton
              onClick={() => onPageChange(pageNumber)}
              selected={pageNumber === currentPage}
            >
              {pageNumber}
            </PageButton>
          </li>
        )
      })}
      <li>
        <PageButton
          disabled={currentPage === lastPage}
          onClick={onNext}
        >
          Arrow
        </PageButton>
      </li>
    </ul>
  )
}
