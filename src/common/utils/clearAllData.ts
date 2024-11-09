import { Paths, removeFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import Router from 'next/router'

export const clearAllData = async (path?: string) => {
  generalStore.clearProfile()
  addPostStore.clearData()
  removeFromLocalStorage(StorageKeys.AccessToken)
  await Router.push(path ? path : Paths.home)
}
