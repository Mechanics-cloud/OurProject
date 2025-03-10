import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import {
  GetAllNotificationsType,
  NotificationDTO,
  NotificationEventDTO,
  NotificationsApiDTO,
  notificationsApi,
} from '@/features/notifications/api'
import { makeAutoObservable, runInAction } from 'mobx'
import { Socket, io } from 'socket.io-client'

class NotificationsStore {
  newNotificationDTO: Nullable<NotificationEventDTO> = null
  notifications: Nullable<NotificationDTO[]> = null
  notificationsDTO: Nullable<NotificationsApiDTO> = null
  socket: Nullable<Socket> = null

  constructor() {
    makeAutoObservable(this)
  }

  addNewNotification(notification: NotificationEventDTO) {
    this.newNotificationDTO = notification
  }

  changeNotificationStatus({
    idsToDelete,
    isRead,
  }: {
    idsToDelete: number[]
    isRead: boolean
  }) {
    if (this.notifications) {
      this.notifications = this.notifications?.map((notification) =>
        idsToDelete.includes(notification.id)
          ? { ...notification, isRead }
          : notification
      )
    }
  }

  connect() {
    const socketOptions = {
      query: {
        accessToken: getFromLocalStorage(StorageKeys.AccessToken),
      },
    }

    this.socket = io(Environments.SOCKET_URL || '', socketOptions)
  }

  async deleteNotification(id: number) {
    try {
      await notificationsApi.deleteNotification(id)
      runInAction(() => {
        if (this.notifications) {
          this.notifications = this.notifications.filter(
            (notification) => notification.id !== id
          )
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
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
        this.notifications = this.notifications || []

        const existingIds = new Set(this.notifications.map((n) => n.id))

        const newNotifications = listOfNotifications.items.filter(
          (notification) => !existingIds.has(notification.id)
        )

        if (newNotifications.length > 0) {
          this.notifications = [
            ...this.notifications,
            ...newNotifications,
          ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        }
      })

      return this.notificationsDTO
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async markAsReadNotifications(idsToDelete: number[]) {
    try {
      await notificationsApi.markAsRead(idsToDelete)
    } catch (error) {
      responseErrorHandler(error)
      this.changeNotificationStatus({
        idsToDelete,
        isRead: false,
      })
    }
  }

  resetData() {
    this.newNotificationDTO = null
    this.notificationsDTO = null
    this.notifications = null
    this.disconnect()
  }
}

export const notificationsStore = new NotificationsStore()
