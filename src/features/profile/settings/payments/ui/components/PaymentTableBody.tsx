import { Table, useTranslation } from '@/common'

import { Payments, paymentTypeConverter } from '../../model'

type Props = {
  data: Payments[]
}

export const PaymentTableBody = ({ data }: Props) => {
  const { t } = useTranslation()

  return (
    <Table.Body>
      {data?.map((payment, index) => {
        return (
          <Table.Row key={payment.subscriptionId || index}>
            <Table.Cell>
              {!payment.dateOfPayment ? (
                <span className={'opacity-0 cursor-default'}>-</span>
              ) : (
                new Date(payment.dateOfPayment).toLocaleDateString('ru')
              )}
            </Table.Cell>
            <Table.Cell>
              {!payment.endDateOfSubscription
                ? ''
                : new Date(payment.endDateOfSubscription).toLocaleDateString(
                    'ru'
                  )}
            </Table.Cell>
            <Table.Cell>{!payment.price ? '' : `$${payment.price}`}</Table.Cell>
            <Table.Cell>
              {paymentTypeConverter(payment.subscriptionType, t)}
            </Table.Cell>
            <Table.Cell>{payment.paymentType}</Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}
