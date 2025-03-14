import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { followSystemAPi } from '../api/followSystem.api'

class FollowSystemStore {
  followingUsers: Map<number, string> = new Map()
  isLoading: boolean = true

  loadingRequestFlag: boolean = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addUserToFollowingUsers(userId: number) {
    this.followingUsers.set(userId, '')
  }

  cleanUp() {
    this.followingUsers.clear()
  }

  async getFollowing(userName: string) {
    if (this.loadingRequestFlag) {
      return
    }
    try {
      this.loadingRequestFlag = true
      const response = await followSystemAPi.getFollowing(userName)

      runInAction(() => {
        response.items.forEach((el) => {
          this.followingUsers.set(el.userId, '')
        })
        this.loadingRequestFlag = false
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  isFollowingUser(userId: number) {
    if (this.followingUsers.size === 0) {
      return false
    }

    return this.followingUsers.has(userId)
  }

  removeUserFromFollowingUsers(userId: number) {
    this.followingUsers.delete(userId)
  }

  async subscribeToUser(userId: number) {
    try {
      this.isLoading = true
      await followSystemAPi.subscribeToUser(userId)
      runInAction(() => {
        this.followingUsers.set(userId, '')
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
  async unsubscribeFromUser(userId: number) {
    try {
      this.isLoading = true
      await followSystemAPi.unsubscribeFromUser(userId)
      runInAction(() => {
        this.removeUserFromFollowingUsers(userId)
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export const followSystemStore = new FollowSystemStore()
