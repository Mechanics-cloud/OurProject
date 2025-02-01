import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Nullable } from '@/common'
import { PublicPostInfo } from '@/features/posts'
import { CommentStore } from '@/features/posts/model/store/commentsStore'
import { LikesStore } from '@/features/posts/model/store/likesStore'
import { PostStore } from '@/features/posts/model/store/postStore'

type CombinedStore = {
  commentStore: CommentStore
  likeStore: LikesStore
  postStore: PostStore
}

type InitialState = PublicPostInfo

let store: CombinedStore

export const StoreContext = createContext<CombinedStore | undefined>(undefined)

export function usePostStore() {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}

function initializeStore(initialData: Nullable<InitialState> = null) {
  const _store = store ?? {
    commentStore: new CommentStore('desc'),
    likeStore: new LikesStore('desc'),
    postStore: new PostStore(),
  }

  if (initialData?.post) {
    _store.postStore.hydrate(initialData.post)
  }

  if (initialData?.comments) {
    _store.commentStore.hydrate(initialData.comments)
  }

  if (typeof window === 'undefined') {
    return _store
  }

  if (!store) {
    store = _store
  }

  return _store
}

type Props = {
  initialState?: Nullable<InitialState>
} & PropsWithChildren

export function PostStoreProvider({ children, initialState }: Props) {
  const [store, setStore] = useState<CombinedStore | null>(null)

  useEffect(() => {
    const initializedStore = initializeStore(initialState)

    setStore(initializedStore)
  }, [initialState])

  return (
    store && (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
  )
}
