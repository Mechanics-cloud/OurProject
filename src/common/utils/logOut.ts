import { Paths, responseErrorHandler } from '@/common'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import Router from 'next/router'

export const logOut = async () => {
  const isLoadingStore = generalStore

  isLoadingStore.turnOnLoading()
  try {
    await authStore.logout()
    await Router.push(Paths.signIn)
  } catch (error: unknown) {
    responseErrorHandler(error)
  } finally {
    isLoadingStore.turnOffLoading()
  }
}
