import { PaymentBanks, PaymentType } from '@/common/enums'

export type Price = {
  amount: number
  typeDescription: PaymentType
}

export type DataSubscriptionApi = {
  amount: number
  baseUrl: string
  paymentType: PaymentBanks
  typeSubscription: PaymentType
}

export type DataSubscription = Omit<DataSubscriptionApi, 'paymentType'>
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
