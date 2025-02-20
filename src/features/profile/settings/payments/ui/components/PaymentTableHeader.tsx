import { Table, useTranslation } from '@/common'

export const PaymentTableHeader = () => {
  const { t } = useTranslation()

  return (
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>{t.profileMyPayments.dateOfPayment}</Table.HeaderCell>
        <Table.HeaderCell>
          {t.profileMyPayments.endDateOfSubscription}
        </Table.HeaderCell>
        <Table.HeaderCell>{t.profileMyPayments.price}</Table.HeaderCell>
        <Table.HeaderCell>
          {t.profileMyPayments.subscriptionType}
        </Table.HeaderCell>
        <Table.HeaderCell>{t.profileMyPayments.paymentType}</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
  )
}
