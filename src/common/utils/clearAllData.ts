import { DefaultPaths, removeFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { createPostStore } from '@/features/createPost'
import { newsFeedStore } from '@/features/newsFeed'
import { notificationsStore } from '@/features/notifications'
import { profileStore, subscriptionStore } from '@/features/profile'
import Router from 'next/router'

export const clearAllData = async (path?: string) => {
  generalStore.clearProfile()
  createPostStore.resetData()
  profileStore.cleanUp()
  newsFeedStore.cleanUp()
  subscriptionStore.cleanUp()
  notificationsStore.resetData()
  removeFromLocalStorage(StorageKeys.AccessToken)
  await Router.push(path ? path : DefaultPaths.publicMainPage)
}
