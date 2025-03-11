import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { dataFollowingUsers } from '../model/types'
import { followSystemEndpoints } from './followSystem.endpoints'

class FollowSystemAPi {
  constructor(private instance: AxiosInstance) {}

  public async getFollowing(userName: string): Promise<dataFollowingUsers> {
    const res = await this.instance.get(
      followSystemEndpoints.getFollowing(userName)
    )

    return res.data
  }

  public subscribeToUser(userId: number) {
    return this.instance.post<void>(followSystemEndpoints.following, {
      selectedUserId: userId,
    })
  }

  public unsubscribeFromUser(userId: number) {
    return this.instance.delete<void>(
      followSystemEndpoints.deleteFollower(userId)
    )
  }
}

export const followSystemAPi = new FollowSystemAPi(instance)
