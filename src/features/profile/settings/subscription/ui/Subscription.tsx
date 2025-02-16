import { useEffect } from 'react'

import { AsyncComponent, Skeleton, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'

import { subscriptionStore, useAccountOptions } from '../model'
import { PaymentRadioGroup, PriceList } from './components'

export const Subscription = observer(() => {
  const priceOptions = subscriptionStore.priceOptions || []
  const paymentValue = subscriptionStore.paymentValue
  const isLoading = subscriptionStore.isLoading
  const setPaymentValue = subscriptionStore.setPaymentValue

  const { t } = useTranslation()

  const { accountOptions, accountValue, defaultAccountValue, setAccountValue } =
    useAccountOptions(t, true)

  useEffect(() => {
    subscriptionStore.getPrice()
  }, [])

  return (
    <AsyncComponent
      isLoading={isLoading}
      loader={<Skeleton className={'w-full h-[130px] mt-10'} />}
    >
      <PaymentRadioGroup
        defaultValue={defaultAccountValue}
        label={t.profileMyPayments.accountType}
        onValueChange={setAccountValue}
        options={accountOptions}
      />

      <PriceList
        accountValue={accountValue}
        defaultValue={paymentValue}
        label={t.profileMyPayments.subscriptionCosts}
        onValueChange={setPaymentValue}
        options={priceOptions}
      />
    </AsyncComponent>
  )
})
