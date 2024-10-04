import * as React from 'react'

import { Tooltip } from '@/common'
import { PageButton } from '@/common/components/pagination/PageButton'
import { DOTS } from '@/common/components/pagination/hooks/usePaginationRange'

type Props = {
  currentPage: number
  onPageChange: (page: number) => void
  paginationRange: Array<number>
}

export const PaginationRangeButtons = ({
  currentPage,
  onPageChange,
  paginationRange,
}: Props) => {
  return (
    <>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index}>&#8230;</li>
        }

        return (
          <li key={index}>
            <Tooltip title={`Go to page ${pageNumber}`}>
              <PageButton
                onClick={() => onPageChange(pageNumber)}
                selected={pageNumber === currentPage}
              >
                {pageNumber}
                <span className={'sr-only'}>`Go to page ${pageNumber}`</span>
              </PageButton>
            </Tooltip>
          </li>
        )
      })}
    </>
  )
}
