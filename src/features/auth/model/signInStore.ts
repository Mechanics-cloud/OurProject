import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import { authApi } from '../api/instanceApi'
import { LoginFormType } from '../signIn/SignIn'

const inst = axios.create({
  baseURL: 'https://inctagram.work/api/v1/',
  withCredentials: true,
})

class SignInStore {
  getToken = async (data: LoginFormType) => {
    const accessToken = await authApi.login(data)

    sessionStorage.setItem('accessToken', accessToken)
  }
  me = async () => {
    const c = await authApi.me()
  }
  updateToken = async () => {
    const b = await authApi.updateToken()

    sessionStorage.setItem('accessToken', b)
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new SignInStore()
