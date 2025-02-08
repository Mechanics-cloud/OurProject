import { useState } from 'react'

import { Nullable } from '@/common'

import { Payments } from './PaymentsType'

export const usePaginationWithStubs = (data: Nullable<Payments[]>) => {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (page: number) => {
    setPageSize(page)
  }

  const paginatedData =
    data?.slice(
      pageSize * (currentPage - 1),
      pageSize * (currentPage - 1) + pageSize
    ) || []

  const stubElements =
    paginatedData.length < 10 ? Array(10 - paginatedData.length).fill(0) : []

  const dataForPage: Payments[] = [...paginatedData, ...stubElements]

  return { currentPage, dataForPage, onPageChange, onPageSize, pageSize }
}
