import { Nullable, responseErrorHandler } from '@/common'
import {
  GetAllNotificationsType,
  NotificationsDTO,
  notificationsApi,
} from '@/features/notifications/api'
import { runInAction } from 'mobx'

class NotificationsStore {
  notificationsDTO: Nullable<NotificationsDTO> = null

  async deleteNotification(id: number) {
    try {
      await notificationsApi.deleteNotification(id)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async getNotifications({ cursor, signal }: GetAllNotificationsType) {
    try {
      const listOfNotifications = await notificationsApi.getAllNotifications({
        cursor,
        signal,
      })

      runInAction(() => {
        this.notificationsDTO = listOfNotifications
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async markAsReadNotifications(idsToDelete: number[]) {
    try {
      await notificationsApi.markAsRead(idsToDelete)
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const notificationsStore = new NotificationsStore()
