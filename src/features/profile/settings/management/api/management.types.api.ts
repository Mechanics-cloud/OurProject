import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

export type dataProps = {
  amount: number
  baseUrl: string
  paymentType: 'PAYPAL' | 'STRIPE'
  typeSubscription: 'DAY' | 'MONTHLY' | 'WEEKLY'
}
