import { responseErrorHandler } from '@/common'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'

export const logOut = async () => {
  const isLoadingStore = generalStore

  isLoadingStore.turnOnLoading()
  try {
    await authStore.logout()
  } catch (error: unknown) {
    responseErrorHandler(error)
  } finally {
    isLoadingStore.turnOffLoading()
  }
}
