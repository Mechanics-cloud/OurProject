import { Nullable, responseErrorHandler } from '@/common'
import {
  GetAllNotificationsType,
  NotificationEventDTO,
  NotificationsApiDTO,
  notificationsApi,
} from '@/features/notifications/api'
import { runInAction } from 'mobx'

class NotificationsStore {
  newNotificationDTO: Nullable<NotificationEventDTO> = null
  notificationsDTO: Nullable<NotificationsApiDTO> = null

  addNewNotification(notification: NotificationEventDTO) {
    this.newNotificationDTO = notification
  }

  async deleteNotification(id: number) {
    try {
      await notificationsApi.deleteNotification(id)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  getNewNotification() {
    return this.newNotificationDTO
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

  resetData() {
    this.newNotificationDTO = null
    this.notificationsDTO = null
  }
}

export const notificationsStore = new NotificationsStore()
