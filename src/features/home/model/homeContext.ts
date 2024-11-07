import { createContext, useContext } from 'react'

import { CommentsStore } from './posts'

export const CommentsStoreContext = createContext<CommentsStore | null>(null)

export const useCommentsStore = () => {
  const context = useContext(CommentsStoreContext)

  if (context === null) {
    throw new Error('Вероятно нет контекста')
  }

  return context
}
