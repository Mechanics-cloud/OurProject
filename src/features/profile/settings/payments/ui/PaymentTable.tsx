import { useEffect } from 'react'

import { CircleLoader, Pagination, Table, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'

import { paymentsStore, usePaginationWithStubs } from '../model'
import { PaymentTableBody, PaymentTableHeader } from './components'

export const PaymentTable = observer(() => {
  const { t } = useTranslation()

  const payments = paymentsStore.payments

  const { currentPage, dataForPage, onPageChange, onPageSize, pageSize } =
    usePaginationWithStubs(payments)

  useEffect(() => {
    paymentsStore.getPayments()
  }, [])

  if (paymentsStore.isLoading) {
    return (
      <CircleLoader
        className={'w-full min-h-[500px] flex items-center justify-center'}
      />
    )
  }

  return (
    <>
      {!payments?.length ? (
        <div
          className={'w-full min-h-[500px] flex items-center justify-center'}
        >
          {t.profileMyPayments.noPayments}
        </div>
      ) : (
        <>
          <div className={'min-h-[500px]'}>
            <Table.Root className={'mt-6 '}>
              <PaymentTableHeader />
              <PaymentTableBody data={dataForPage} />
            </Table.Root>
          </div>
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
  )
})
