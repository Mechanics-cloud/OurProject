import { useEffect, useMemo, useState } from 'react'

import { RadioOption, getFromLocalStorage } from '@/common'
import { AccountTypeValue, ManualAccountType } from '@/common/enums'
import { LocaleType } from '@locales/ru'

export const useAccountOptions = (
  t: LocaleType,
  isPaidAccount: boolean = false
) => {
  const accountOptions: RadioOption[] = useMemo(
    () => [
      {
        label: t.profileMyPayments.personal,
        value: AccountTypeValue.Personal,
      },
      {
        label: t.profileMyPayments.business,
        value: AccountTypeValue.Business,
      },
    ],
    [t.profileMyPayments.personal, t.profileMyPayments.business]
  )

  useEffect(() => {
    const manualChangeAccountType = getFromLocalStorage(
      ManualAccountType.AccountType
    )

    if (manualChangeAccountType) {
      setAccountValue(manualChangeAccountType)
    } else if (isPaidAccount) {
      setAccountValue(accountOptions[1].value)
    } else {
      setAccountValue(accountOptions[0].value)
    }
  }, [isPaidAccount, accountOptions])

  const [accountValue, setAccountValue] = useState('')

  const isBusiness = accountValue === AccountTypeValue.Business

  return {
    accountOptions,
    accountValue,
    isBusiness,
    setAccountValue,
  }
}
