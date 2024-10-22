import { toast } from 'react-toastify'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { profileAPi } from '@/features/profile/settings/generalInfo/api/profile.api'
import {
  FormData,
  UpdatedProfile,
} from '@/features/profile/settings/generalInfo/model/useFillGeneralForm'
import { makeAutoObservable, runInAction } from 'mobx'

class ProfileStore {
  updatedProfile: UpdatedProfile | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async getProfile() {
    try {
      const updatedProfile = await profileAPi.getProfile()

      runInAction(() => {
        this.updatedProfile = updatedProfile
      })

      return updatedProfile
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async updateProfile(data: FormData) {
    try {
      const updatedData: UpdatedProfile = {
        aboutMe: data.aboutMe ?? '',
        city: data.city ?? '',
        country: data.country ?? '',
        dateOfBirth: data.dateOfBirth ?? '',
        firstName: data.firstName,
        lastName: data.lastName,
        region: '',
        userName: data.userName,
      }
      const res = await profileAPi.updateProfile(updatedData)

      if (res.status === 204) {
        toast.success('Your settings are saved!')
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export default new ProfileStore()
