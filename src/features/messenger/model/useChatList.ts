import { useState } from 'react'

import { Nullable } from '@/common'
import { messengerStore } from '@/features/messenger/model/store/store'
import { useRouter } from 'next/router'

export const useChatList = () => {
  const router = useRouter()
  const dialogPartnerIdFromQueryParams = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : null

  const filteredChatList = messengerStore.getFilteredChatList
  const [chosenChatId, setChosenChatId] = useState<Nullable<number>>(
    dialogPartnerIdFromQueryParams
  )

  return { chosenChatId, filteredChatList, setChosenChatId }
}
