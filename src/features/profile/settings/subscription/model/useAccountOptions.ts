import { useState } from 'react'

import { RadioOption } from '@/common'
import { AccountTypeValue } from '@/common/enums'
import { LocaleType } from '@locales/ru'

export const useAccountOptions = (
  t: LocaleType,
  isPaidAccount: boolean = false
) => {
  const accountOptions: RadioOption[] = [
    {
      label: t.profileMyPayments.personal,
      value: AccountTypeValue.Personal,
    },
    {
      label: t.profileMyPayments.business,
      value: AccountTypeValue.Business,
    },
  ]
  const defaultAccountValue = isPaidAccount
    ? accountOptions[1].value
    : accountOptions[0].value

  const [accountValue, setAccountValue] = useState(defaultAccountValue)

  return { accountOptions, accountValue, defaultAccountValue, setAccountValue }
}
