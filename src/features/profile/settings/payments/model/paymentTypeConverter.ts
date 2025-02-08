import { PaymentType } from '@/common/enums'
import { LocaleType } from '@locales/index'

export const paymentTypeConverter = (day: string, t: LocaleType) => {
  switch (day) {
    case PaymentType.Day:
      return t.profileMyPayments.day
    case PaymentType.Monthly:
      return t.profileMyPayments.monthly
    case PaymentType.Weekly:
      return t.profileMyPayments.weekly
  }
}
