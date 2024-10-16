import { StorageKeys } from '@/common/enums'
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common/utils/localStorage'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Profile, authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import { postsApi } from './posts.api'
import { PostsComments, PostsLikes } from './posts.types'

class PostsStore {
  comments: PostsComments | null = null
  likes: PostsLikes | null = null

  constructor() {
    makeAutoObservable(this)
  }

  // async getComments(postId: number) {
  //   try {
  //     this.comments = await postsApi.postIdComments({ postId })
  //   } catch (error) {
  //     responseErrorHandler(error)
  //   }
  // }

  async getLikes(postId: number) {
    try {
      this.likes = await postsApi.postIdLikes({ postId })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export default new PostsStore()
