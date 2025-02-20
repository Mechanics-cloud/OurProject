import { useEffect } from 'react'

import { CircleLoader, Pagination, Table, useScreenWidth } from '@/common'
import { observer } from 'mobx-react-lite'

import { paymentsStore, usePaginationWithStubs } from '../model'
import {
  MobilePayments,
  NotPayments,
  PaymentTableBody,
  PaymentTableHeader,
} from './components'

export const PaymentTable = observer(() => {
  const { isMobile } = useScreenWidth()

  const { isLoading, payments } = paymentsStore

  const { currentPage, dataForPage, onPageChange, onPageSize, pageSize } =
    usePaginationWithStubs(payments)

  useEffect(() => {
    paymentsStore.getPayments()
  }, [])

  if (isLoading) {
    return (
      <CircleLoader
        className={'w-full h-[500px] flex items-center justify-center'}
      />
    )
  }

  return (
    <div className={'flex flex-col '}>
      {!payments?.length ? (
        <NotPayments />
      ) : (
        <>
          {isMobile ? (
            <>
              {payments?.map((el) => {
                return (
                  <MobilePayments
                    key={el.subscriptionId}
                    value={el}
                  />
                )
              })}
            </>
          ) : (
            <>
              <Table.Root className={'mt-6 '}>
                <PaymentTableHeader />
                <PaymentTableBody data={dataForPage} />
              </Table.Root>

              <div className={'mt-9'}>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  onPageSize={onPageSize}
                  pageSize={pageSize}
                  totalItemsCount={payments?.length || 0}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
})
