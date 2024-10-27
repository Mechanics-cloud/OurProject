import { StorageKeys } from '@/common/enums'
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common/utils/localStorage'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Profile, authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { homeApi } from '../home.api'
import { HomePageRootInterface } from '../home.types'
import { postsApi } from './posts.api'
import { PostsComments, PostsLikes } from './posts.types'

export class CommentsStore {
  comments: PostsComments | null = null
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async getComments(postId: number) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.getPostIdComments({ postId })

      runInAction(() => {
        this.comments = response
        this.isLoading = false
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
export class LikesStore {
  isLoading: boolean = false
  likes: PostsLikes | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async getComments(postId: number) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.getPostLikes({ postId })

      runInAction(() => {
        this.likes = response
        this.isLoading = false
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
