import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { followSystemEndpoints } from './followSystem.endpoints'

//TODO
//убрать логи и any

class FollowSystemAPi {
  constructor(private instance: AxiosInstance) {}

  public deleteFollower(data: number) {
    return this.instance.delete<any>(followSystemEndpoints.deleteFollower(data))
  }

  public getFollowing(userName: string) {
    return this.instance.get<any>(followSystemEndpoints.getFollowing(userName))
  }

  public postFollowing(data: number) {
    return this.instance.post<any>(followSystemEndpoints.following, {
      selectedUserId: data,
    })
  }
}

export const followSystemAPi = new FollowSystemAPi(instance)
