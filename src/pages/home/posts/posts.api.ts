import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { HomePageQuery } from '../home.types'
import { PostsComments, PostsLikes } from './posts.types'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  //todo del getFollowing
  public getFollowing(userName: any) {
    return instance.get<any>(`/v1/users/${userName}/following`).then((res) => {
      console.log(res)

      return res.data
    })
  }
  public getPostIdComments({ postId }: { postId: number }) {
    return instance
      .get<PostsComments>(`/v1/posts/${postId}/comments`)
      .then((res) => res.data)
  }
  public getPostLikes({ postId }: { postId: number }) {
    return instance
      .get<PostsLikes>(`/v1/posts/${postId}/likes`)
      .then((res) => res.data)
  }
  public postLike({ postId }: { postId: number }) {
    return instance
      .put<any>(`/v1/posts/${postId}/like-status`, {
        likeStatus: 'LIKE',
      })
      .then((res) => res.data)
  }
  public publicPost({ postId }: { postId: number }) {
    return instance
      .get<any>(`/v1/public-posts/${postId}`)
      .then((res) => res.data)
  }

  public publicPosts(data: HomePageQuery) {
    return instance
      .get<any>(`/v1/public-posts/all/`, { params: data })
      .then((res) => res.data)
  }
  public toFollowing(selectedUserId: any) {
    return instance
      .post<any>(`/v1/users/following`, selectedUserId)
      .then((res) => {
        console.log(res)

        return res.data
      })
  }
}

export const postsApi = new PostsApi(instance)
