import { Card, useTranslation } from '@/common'

import { Payments, paymentTypeConverter } from '../../model'
import { PaymentDetailRow } from './PaymentDetailRow'
type Props = {
  value: Payments
}
export const MobilePayments = ({ value }: Props) => {
  const { t } = useTranslation()

  return (
    <Card
      className={
        'self-center w-full min-w-[300px] max-w-[450px] flex flex-col gap-3 mt-6'
      }
    >
      <PaymentDetailRow
        label={t.profileMyPayments.dateOfPayment}
        value={new Date(value.dateOfPayment).toLocaleDateString('ru')}
      />
      <PaymentDetailRow
        label={t.profileMyPayments.endDateOfSubscription}
        value={new Date(value.endDateOfSubscription).toLocaleDateString('ru')}
      />
      <PaymentDetailRow
        label={t.profileMyPayments.price}
        value={`$${value.price}`}
      />
      <PaymentDetailRow
        label={t.profileMyPayments.subscriptionType}
        value={paymentTypeConverter(value.subscriptionType, t)}
      />
      <PaymentDetailRow
        label={t.profileMyPayments.paymentType}
        value={value.paymentType}
      />
    </Card>
  )
}
