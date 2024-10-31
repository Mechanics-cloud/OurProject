import { Paths, removeFromLocalStorage, responseErrorHandler } from '@/common'
import { StorageKeys } from '@/common/enums'
import authStore from '@/features/auth/model/authStore'
import {
  DeviceType,
  profileDevicesApi,
} from '@/features/profile/settings/devices/api'
import { sessionsDataSchema } from '@/features/profile/settings/devices/model/sessionsDataSchema'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'
import Router from 'next/router'

class ProfileSessionsStore {
  currentSession?: DeviceType
  loading: boolean = false
  otherSession?: DeviceType[]

  constructor() {
    makeAutoObservable(this)
  }

  async deleteSession(deviceId: number) {
    this.loading = true
    try {
      await profileDevicesApi.deleteSession(deviceId)
      runInAction(() => {
        if (this.currentSession && this.otherSession) {
          this.otherSession = this.otherSession.filter(
            (device) => device.deviceId !== deviceId
          )
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.loading = false
    }
  }

  async getSessions() {
    this.loading = true
    try {
      const sessions = await profileDevicesApi.getSessions()
      const otherSessions = sessions.others.map((session) => ({
        ...session,
        lastActive: format(sessions.current.lastActive, 'dd.MM.yyyy', {
          locale: ru,
        }),
      }))

      sessionsDataSchema.parse(sessions.current)
      sessions.others.forEach((device) => sessionsDataSchema.parse(device))
      runInAction(() => {
        this.currentSession = sessions.current
        this.otherSession = otherSessions.filter(
          (session) => session.deviceId !== this.currentSession?.deviceId
        )
      })

      return sessions
    } catch (error) {
      //todo interceptor не перехватывает, т.к. при разлогине возвращается 400
      Router.push(Paths.profile)
      removeFromLocalStorage(StorageKeys.AccessToken)
      authStore.clearProfile()
    } finally {
      this.loading = false
    }
  }

  async terminateAllSessions() {
    this.loading = true
    try {
      await profileDevicesApi.terminateAllSessions()
      runInAction(() => {
        this.otherSession = []
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.loading = false
    }
  }
}

export const profileSessionsStore = new ProfileSessionsStore()
