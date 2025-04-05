import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { searchUserEndpoints } from './searchUser.endpoints'
import { GetUserByNameArgs, UsersInfoDTO } from './searchUser.types'

class SearchUserApi {
  constructor(private instance: AxiosInstance) {}

  async getUserByName(args: GetUserByNameArgs | void): Promise<UsersInfoDTO> {
    const res = await this.instance.get(searchUserEndpoints.getProfile, {
      params: {
        cursor: args?.cursor,
        pageNumber: args?.pageNumber || 1,
        pageSize: args?.pageSize || 10,
        search: args?.search,
      },
      signal: args?.signal,
    })

    return res.data
  }
}

export const searchUserApi = new SearchUserApi(instance)
