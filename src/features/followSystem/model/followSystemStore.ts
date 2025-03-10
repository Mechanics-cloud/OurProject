import { toast } from 'react-toastify'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { followSystemAPi } from '../api/followSystem.api'

//TODO
//добавить типы и методы подписки-отписки
//убрать логи и any

class FollowSystemStore {
  followingUsers: any = null
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

      console.log(response.data)

      runInAction(() => {
        this.followingUsers = response.data
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
}

export const followSystemStore = new FollowSystemStore()
