import { Environments } from '@/common'
import axios from 'axios'

import { ImagesData } from '../model'
import { PublicProfile } from '../settings'
import { PublicProfileEndpoints } from './publicProfile.endpoints'

class PublicProfileAPi {
  constructor() {}

  public async getPublicPosts(
    userId: number,
    endCursorPostId: number = 0,
    signal?: AbortSignal,
    pageSize: number = 8
  ): Promise<ImagesData> {
    const res = await axios(
      Environments.API_URL +
        PublicProfileEndpoints.publicPosts(userId, endCursorPostId),
      {
        params: {
          pageSize,
        },
        signal,
      }
    )

    return res.data
  }
  public async getPublicUser(profileId: string): Promise<PublicProfile> {
    const res = await axios(
      Environments.API_URL + PublicProfileEndpoints.publicProfile(profileId)
    )

    return res.data
  }
}

export const publicProfileAPi = new PublicProfileAPi()
