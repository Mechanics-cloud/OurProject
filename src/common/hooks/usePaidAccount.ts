import { useEffect, useState } from 'react'

import { ManualAccountType } from '../enums'

export const usePaidAccount = () => {
  const [isPaid, setIsPaid] = useState(false)
  const [deleteCookie, setDeleteCookie] = useState(false)

  useEffect(() => {
    if (deleteCookie) {
      document.cookie = `${ManualAccountType.paymentCookies}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
    const cookie = document.cookie.split('; ')

    const isPaidCookie = cookie.some((cookie) => cookie.startsWith(`payment=`))

    setIsPaid(isPaidCookie)

    return () => {
      setDeleteCookie(false)
    }
  }, [deleteCookie])

  const resetPaidStatus = () => {
    setDeleteCookie(true)
  }

  return { isPaid, resetPaidStatus }
}
