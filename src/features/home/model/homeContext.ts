import { createContext, useContext } from 'react'

import { CommentsStore } from './posts'

export const CommentsStoreContext = createContext<CommentsStore | null>(null)

export const useStore = () => {
  const context = useContext(CommentsStoreContext)

  if (context === null) {
    throw new Error('Вероятно не контекста')
  }

  return context
}
