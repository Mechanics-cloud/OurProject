import { Paths, removeFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import Router from 'next/router'

export const clearAllData = () => {
  Router.push(Paths.home)
  generalStore.clearProfile()
  removeFromLocalStorage(StorageKeys.AccessToken)
}
