import { responseErrorHandler } from '@/common'
import {
  Sessions,
  profileDevicesApi,
} from '@/features/profile/settings/devices/api'
import { sessionsDataSchema } from '@/features/profile/settings/devices/model/sessionsDataSchema'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'

class ProfileSessionsStore {
  loading: boolean = false
  sessions?: Sessions

  constructor() {
    makeAutoObservable(this)
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
      //console.log(sessions.current, otherSessions)
      runInAction(() => {
        this.sessions = { current: sessions.current, others: otherSessions }
      })

      return sessions
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.loading = false
    }
  }
}

export const profileSessionsStore = new ProfileSessionsStore()
