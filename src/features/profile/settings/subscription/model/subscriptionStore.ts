import { toast } from 'react-toastify'

import {
  Environments,
  Nullable,
  RadioOption,
  getFromLocalStorage,
  removeFromLocalStorage,
  responseErrorHandler,
  setToLocalStorage,
} from '@/common'
import {
  AccountTypeValue,
  ManualAccountType,
  PaymentType,
} from '@/common/enums'
import { translationForStore } from '@/common/utils/setTranslation'
import { makeAutoObservable, runInAction } from 'mobx'

import { paymentTypeConverter } from '../../payments'
import { subscriptionAPi } from '../api'
import { CurrentPayments, Price } from './types'

class SubscriptionStore {
  currentPayments: Nullable<CurrentPayments> = null
  isLoading: boolean = false
  isPaidAccount: boolean = false
  lastPaymentDate: Nullable<Date> = null
  paymentValue: '' | PaymentType = ''
  price: Nullable<Price[]> = null
  priceOptions: Nullable<RadioOption[]> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async canceledAutoRenewal() {
    try {
      this.isLoading = true

      await subscriptionAPi.canceledAutoRenewal()

      toast.success(translationForStore.t.profileMyPayments.disabledAutoRenewal)
      runInAction(() => {
        if (this.currentPayments) {
          this.currentPayments = {
            ...this.currentPayments,
            hasAutoRenewal: false,
          }
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  cleanUp() {
    this.currentPayments = null
    this.isLoading = false
    this.isPaidAccount = false
    this.paymentValue = ''
    this.price = null
    this.priceOptions = null
    document.cookie = `${ManualAccountType.paymentCookies}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
  convertOptions() {
    const priceOptions = this.price?.map((el) => ({
      label: `$${el.amount} ${
        translationForStore.t.profileMyPayments.per
      } ${paymentTypeConverter(el.typeDescription, translationForStore.t)}`,
      value: String(el.typeDescription),
    }))

    if (priceOptions) {
      this.priceOptions = priceOptions
    }
  }
  async getCurrentPayment() {
    try {
      const res = await subscriptionAPi.getCurrentPayment()

      runInAction(() => {
        this.currentPayments = res
        if (res.data.length) {
          const personalType = getFromLocalStorage(
            ManualAccountType.AccountType
          )

          const currentDate = new Date()

          const lastPaymentDate = new Date(
            res.data.at(-1)?.endDateOfSubscription!
          )

          this.lastPaymentDate = lastPaymentDate

          const paid = currentDate < lastPaymentDate

          this.isPaidAccount = paid

          if (!personalType) {
            document.cookie = `${
              ManualAccountType.paymentCookies
            }; expires=${this.lastPaymentDate.toUTCString()}; path=/`
          }
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async getPrice() {
    try {
      this.isLoading = true
      const res = await subscriptionAPi.getPrice()

      await this.getCurrentPayment()
      runInAction(() => {
        this.paymentValue = res[0].typeDescription
        this.price = res
        this.convertOptions()
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  manualChangeAccountType(value: string, resetCookie: () => void) {
    if (value === AccountTypeValue.Business) {
      removeFromLocalStorage(ManualAccountType.AccountType)
      if (this.lastPaymentDate) {
        document.cookie = `${
          ManualAccountType.paymentCookies
        }; expires=${this.lastPaymentDate.toUTCString()}; path=/`
      }
    } else {
      setToLocalStorage(ManualAccountType.AccountType, value)
      resetCookie()
    }
  }

  processPayment() {
    const obj = this.price?.find(
      (el) => el.typeDescription === this.paymentValue
    )
    const paymentRequest = {
      ...obj,
      baseUrl: `${Environments.BASE_URL}/profile/settings/management`,
    }

    console.log(paymentRequest)

    // todo: добавить логику оплаты
  }

  setPaymentValue(value: PaymentType) {
    this.paymentValue = value
  }
}

export const subscriptionStore = new SubscriptionStore()
