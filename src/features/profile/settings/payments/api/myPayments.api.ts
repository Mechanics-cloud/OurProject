import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { Payments } from '../model'
import { PaymentsEndpoints } from './myPayments.endpoints'

class MyPaymentsApi {
  constructor(private instance: AxiosInstance) {}
  async getPayments(): Promise<Payments[]> {
    const res = await this.instance.get(PaymentsEndpoints.getPayments)

    return res.data
  }
}

export const myPaymentsApi = new MyPaymentsApi(instance)
