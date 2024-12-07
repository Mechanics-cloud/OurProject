import { createContext, useContext } from 'react'

import { Nullable } from '@/common'

import { CommentsStore } from './commentsStore'

export const CommentsStoreContext = createContext<Nullable<CommentsStore>>(null)

export const useCommentsStore = () => {
  const context = useContext(CommentsStoreContext)

  if (context === null) {
    throw new Error('Вероятно нет контекста')
  }

  return context
}
