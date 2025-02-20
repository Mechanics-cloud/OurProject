import { Nullable, responseErrorHandler } from '@/common'
import { makeAutoObservable, runInAction } from 'mobx'

import { myPaymentsApi } from '../api'
import { Payments } from './PaymentsType'

class PaymentsStore {
  isLoading: Boolean = false
  payments: Nullable<Payments[]> = null
  constructor() {
    makeAutoObservable(this)
  }

  async getPayments() {
    try {
      this.isLoading = true
      const data = await myPaymentsApi.getPayments()

      runInAction(() => {
        this.payments = data
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export const paymentsStore = new PaymentsStore()
