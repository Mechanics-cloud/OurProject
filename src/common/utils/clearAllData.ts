import { Paths, removeFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import Router from 'next/router'

export const clearAllData = async (path?: string) => {
  generalStore.clearProfile()
  removeFromLocalStorage(StorageKeys.AccessToken)
  await Router.push(path ? path : Paths.home)
}
