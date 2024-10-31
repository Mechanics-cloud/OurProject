import { Paths, removeFromLocalStorage, responseErrorHandler } from '@/common'
import { StorageKeys } from '@/common/enums'
import authStore from '@/features/auth/model/authStore'
import {
  Sessions,
  profileDevicesApi,
} from '@/features/profile/settings/devices/api'
import { sessionsDataSchema } from '@/features/profile/settings/devices/model/sessionsDataSchema'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'
import Router from 'next/router'

class ProfileSessionsStore {
  loading: boolean = false
  sessions?: Sessions

  constructor() {
    makeAutoObservable(this)
  }

  async deleteSession(deviceId: number) {
    this.loading = true
    try {
      await profileDevicesApi.deleteSession(deviceId)
      runInAction(() => {
        if (this.sessions && this.sessions.others) {
          this.sessions = {
            ...this.sessions,
            others: this.sessions?.others.filter(
              (device) => device.deviceId !== deviceId
            ),
          }
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
        this.sessions = { current: sessions.current, others: otherSessions }
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
        if (this.sessions && this.sessions.others) {
          this.sessions = {
            ...this.sessions,
            others: [],
          }
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.loading = false
    }
  }
}

export const profileSessionsStore = new ProfileSessionsStore()
