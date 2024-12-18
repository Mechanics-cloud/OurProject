import { Paths, removeFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { addPostStore } from '@/features/createPost'
import { newsFeedStore } from '@/features/newsFeed'
import { profileStore } from '@/features/profile'
import Router from 'next/router'

export const clearAllData = async (path?: string) => {
  generalStore.clearProfile()
  addPostStore.resetData()
  profileStore.cleanUp()
  newsFeedStore.cleanUp()
  removeFromLocalStorage(StorageKeys.AccessToken)
  await Router.push(path ? path : Paths.publicMainPage)
}
