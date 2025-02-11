import { PaymentType } from '@/common/enums'

export type DataSubscriptionApi = {
  amount: number
  baseUrl: string
  paymentType: 'PAYPAL' | 'STRIPE'
  typeSubscription: PaymentType
}

export type DataSubscription = Omit<DataSubscriptionApi, 'paymentType'>
