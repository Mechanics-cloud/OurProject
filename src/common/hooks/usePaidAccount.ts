import { useEffect, useState } from 'react'

import { ManualAccountType } from '../enums'

export const usePaidAccount = () => {
  const [isPaid, setIsPaid] = useState(false)
  const [isDeleteCookie, setIsDeleteCookie] = useState(false)

  useEffect(() => {
    if (isDeleteCookie) {
      document.cookie = `${ManualAccountType.paymentCookies}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
    const cookies = document.cookie.split('; ')

    const isPaidCookie = cookies.some((cookie) => cookie.startsWith(`payment=`))

    setIsPaid(isPaidCookie)

    return () => {
      setIsDeleteCookie(false)
    }
  }, [isDeleteCookie])

  const resetPaidStatus = () => {
    setIsDeleteCookie(true)
  }

  return { isPaid, resetPaidStatus }
}
