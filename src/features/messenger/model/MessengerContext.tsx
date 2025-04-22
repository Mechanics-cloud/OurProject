import { ReactNode, createContext, useContext, useState } from 'react'

import { Nullable } from '@/common'
import { observer } from 'mobx-react-lite'

type ToggleType = 'chat' | 'list'

type MessengerContextType = {
  openedTab: ToggleType
  setChatAsOpenedTab: () => void
  setListAsOpenedTab: () => void
}

const MessengerContext = createContext<Nullable<MessengerContextType>>(null)

export const MessengerProvider = observer(
  ({ children }: { children: ReactNode }) => {
    const [openedTab, setOpenedTab] = useState<ToggleType>('list')

    return (
      <MessengerContext.Provider
        value={{
          openedTab,
          setChatAsOpenedTab: () => setOpenedTab('chat'),
          setListAsOpenedTab: () => setOpenedTab('list'),
        }}
      >
        {children}
      </MessengerContext.Provider>
    )
  }
)

export const useMessengerContext = () => {
  const context = useContext(MessengerContext)

  if (!context) {
    throw new Error('You forgot about NotificationsSocketProvider provider')
  }

  return context
}
