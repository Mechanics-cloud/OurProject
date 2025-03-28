import { useState } from 'react'

import { Nullable, useTranslation } from '@/common'
import { useRouter } from 'next/router'

import { messengerStore } from './stores/messengerStore'

export const useChatList = () => {
  const router = useRouter()
  const dialogPartnerIdFromQueryParams = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : null
  const { t } = useTranslation()

  const filteredChatList = messengerStore.getFilteredChatList
  const [chosenChatId, setChosenChatId] = useState<Nullable<number>>(
    dialogPartnerIdFromQueryParams
  )

  return { chosenChatId, filteredChatList, setChosenChatId, text: t.messenger }
}
