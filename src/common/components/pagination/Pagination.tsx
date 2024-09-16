import * as React from 'react'
import { Select } from 'react-day-picker'

import {
  ArrowBackOutline,
  ArrowIosBackOutline,
  ArrowIosForward,
} from '@/assets/icons'
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
  const isBackArrowDisabled = currentPage === 1
  const isForwardArrowDisabled = currentPage === lastPage

  return (
    <div className={'flex gap-8'}>
      <ul className={'flex gap-x-3 align-middle'}>
        <li className={'flex align-middle'}>
          <PageButton
            disabled={isBackArrowDisabled}
            onClick={onPrevious}
          >
            <ArrowIosBackOutline
              className={cn(
                `h-4 w-4 ${isBackArrowDisabled && 'text-dark-100'}`
              )}
            />
          </PageButton>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={index}>&#8230;</li>
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
        <li className={'flex align-middle'}>
          <PageButton
            disabled={isForwardArrowDisabled}
            onClick={onNext}
          >
            <ArrowIosForward
              className={cn(
                `h-4 w-4 ${isForwardArrowDisabled && 'text-dark-100'}`
              )}
            />
          </PageButton>
        </li>
      </ul>
      <span className={'content-center'}>
        Show <select></select> on page
      </span>
    </div>
  )
}
