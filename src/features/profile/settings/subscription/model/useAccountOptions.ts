import { useEffect, useState } from 'react'

import { RadioOption, getFromLocalStorage } from '@/common'
import { AccountTypeValue, ManualAccountType } from '@/common/enums'
import { LocaleType } from '@locales/index'

export const useAccountOptions = (
  t: LocaleType,
  isPaidAccount: boolean = false
) => {
  const manualChangeAccountType = getFromLocalStorage(
    ManualAccountType.AccountType
  )

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

  useEffect(() => {
    if (manualChangeAccountType) {
      setAccountValue(manualChangeAccountType)
    } else if (isPaidAccount) {
      setAccountValue(accountOptions[1].value)
    } else {
      setAccountValue(accountOptions[0].value)
    }
  }, [isPaidAccount])

  const [accountValue, setAccountValue] = useState('')

  const isBusiness = accountValue === AccountTypeValue.Business

  return {
    accountOptions,
    accountValue,
    isBusiness,
    setAccountValue,
  }
}
