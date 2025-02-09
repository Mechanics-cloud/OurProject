import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

export type DataSubscriptionApi = {
  amount: number
  baseUrl: string
  paymentType: 'PAYPAL' | 'STRIPE'
  typeSubscription: 'DAY' | 'MONTHLY' | 'WEEKLY'
}

export type DataSubscription = Omit<DataSubscriptionApi, 'paymentType'>
