import { toast } from 'react-toastify'

import { Nullable } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { followSystemAPi } from '../api/followSystem.api'
import { dataFollowingUsers } from './types'

//TODO
//запросить всех на кого подписан
//убрать логи и any и toast.success('ВСЕ ГУД')

class FollowSystemStore {
  followingUsers: Nullable<dataFollowingUsers> = null
  isLoading: boolean = true

  loadingRequestFlag: boolean = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  cleanUp() {
    this.followingUsers = null
  }

  async getFollowing(userName: string) {
    if (this.loadingRequestFlag || this.followingUsers) {
      return
    }
    try {
      this.loadingRequestFlag = true
      const response = await followSystemAPi.getFollowing(userName)

      console.log(response)

      runInAction(() => {
        this.followingUsers = response
        this.isLoading = false
        this.loadingRequestFlag = false
      })
    } catch (error) {
      responseErrorHandler(error)
      runInAction(() => {
        this.isLoading = false
      })
    } finally {
      toast.success('ВСЕ ГУД')
    }
  }

  isFollowingUser(userId: number) {
    if (!this.followingUsers || this.followingUsers.items.length === 0) {
      return false
    }

    const hasMatchingId = this.followingUsers.items.some(
      (item: any) => item.userId === userId
    )

    return hasMatchingId
  }

  async subscribeToUser(userId: number) {
    try {
      followSystemAPi.subscribeToUser(userId)
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async unsubscribeFromUser(userId: number) {
    try {
      followSystemAPi.unsubscribeFromUser(userId)
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const followSystemStore = new FollowSystemStore()
