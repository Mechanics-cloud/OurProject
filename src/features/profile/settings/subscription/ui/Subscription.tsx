import { useEffect } from 'react'

import {
  AsyncComponent,
  Skeleton,
  usePaidAccount,
  useTranslation,
} from '@/common'
import { observer } from 'mobx-react-lite'

import { subscriptionStore, useAccountOptions } from '../model'
import { AutoRenewal, PaymentRadioGroup, PriceList } from './components'

export const Subscription = observer(() => {
  const { t } = useTranslation()

  const priceOptions = subscriptionStore.priceOptions || []
  const paymentValue = subscriptionStore.paymentValue
  const isLoading = subscriptionStore.isLoading
  const setPaymentValue = subscriptionStore.setPaymentValue
  const isPaidAccount = subscriptionStore.isPaidAccount

  const { accountOptions, accountValue, isBusiness, setAccountValue } =
    useAccountOptions(t, isPaidAccount)

  const { resetPaidStatus } = usePaidAccount()

  useEffect(() => {
    subscriptionStore.getPrices()
  }, [])

  useEffect(() => {
    subscriptionStore.convertOptions()
  }, [t.profileMyPayments.business])

  const onAccountTypeHandler = (value: string) => {
    subscriptionStore.manualChangeAccountType(value, resetPaidStatus)
    setAccountValue(value)
  }

  return (
    <>
      <AsyncComponent
        isLoading={isLoading}
        loader={<Skeleton className={'w-full h-[130px] mt-10'} />}
      >
        {isPaidAccount && <AutoRenewal isShow={isBusiness} />}
        <PaymentRadioGroup
          label={t.profileMyPayments.accountType}
          onValueChange={onAccountTypeHandler}
          options={accountOptions}
          value={accountValue}
        />

        <PriceList
          isShow={isBusiness}
          label={t.profileMyPayments.subscriptionCosts}
          onValueChange={setPaymentValue}
          options={priceOptions}
          value={paymentValue}
        />
      </AsyncComponent>
    </>
  )
})
