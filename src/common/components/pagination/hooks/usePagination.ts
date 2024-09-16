import * as React from 'react'

import { DOTS } from '@/common/components/pagination/Pagination'

type UsePaginationParamType = {
  currentPage: number
  pageSize: number
  siblingCount: number
  totalItemsCount: number
}

export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount,
  totalItemsCount,
}: UsePaginationParamType): Array<number> => {
  return React.useMemo(() => {
    const totalPageCount = Math.ceil(totalItemsCount / pageSize)
    const totalPageNumbers = siblingCount + 5
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )

      return [firstPageIndex, DOTS, ...rightRange]
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex)

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }, [totalItemsCount, pageSize, siblingCount, currentPage])
}

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}
