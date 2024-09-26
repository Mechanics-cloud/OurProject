import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import { LoginFormType } from '../signIn/SignIn'

class SignInStore {
  getToken = async (data: LoginFormType) => {
    const a = await axios
      .post('https://inctagram.work/api/v1/auth/login', data)
      .then((res) => res.data)

    this.token = a
  }
  token = {}

  constructor() {
    makeAutoObservable(this)
  }
}

export default new SignInStore()
