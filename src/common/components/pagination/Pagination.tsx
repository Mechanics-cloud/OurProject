import * as React from 'react'

import { ArrowIosForward } from '@/assets/icons/filledIcons'
import { ArrowIosBackOutline } from '@/assets/icons/outlineIcons'
import { usePagination } from '@/common/components/pagination/hooks/usePagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/select/Select'
import { cn } from '@/common/utils/cn'

import { PageButton } from './PageButton'

type Props = {
  currentPage: number
  onPageChange: (page: number) => void
  onPageSize: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalItemsCount: number
}

export const DOTS = 0

export const Pagination = ({
  currentPage,
  onPageChange,
  onPageSize,
  pageSize,
  siblingCount = 1,
  totalItemsCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalItemsCount,
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

  const pageSizes = [10, 20, 30, 50, 100]

  return (
    <div className={'flex gap-8'}>
      <ul className={'flex gap-x-3 align-middle'}>
        <li
          className={'flex align-middle'}
          key={'arrowBack'}
        >
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
            <li key={index}>
              <PageButton
                onClick={() => onPageChange(pageNumber)}
                selected={pageNumber === currentPage}
              >
                {pageNumber}
              </PageButton>
            </li>
          )
        })}
        <li
          className={'flex align-middle'}
          key={'arrowForward'}
        >
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
      <div className={'flex gap-1 text-sm items-center'}>
        <span>Show</span>
        <Select>
          <SelectGroup>
            <SelectTrigger className={'min-w-[50px]'}>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent className={'text-sm'}>
              {pageSizes.map((size, index) => (
                <SelectItem
                  key={index}
                  onSelect={(e) => onPageSize(e.currentTarget)}
                  value={`select item-${size}`}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
        <span>on page</span>
      </div>
    </div>
  )
}
