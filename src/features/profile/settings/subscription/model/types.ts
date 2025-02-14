import { PaymentType } from '@/common/enums'

export type Price = {
  amount: number
  typeDescription: PaymentType
}
export type CurrentPayments = {
  data: Array<CurrentPayment>
  hasAutoRenewal: boolean
}
type CurrentPayment = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}
