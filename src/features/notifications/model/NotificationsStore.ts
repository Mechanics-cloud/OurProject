import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import {
  GetAllNotificationsType,
  NotificationEventDTO,
  NotificationsApiDTO,
  notificationsApi,
} from '@/features/notifications/api'
import { makeAutoObservable, runInAction } from 'mobx'
import { Socket, io } from 'socket.io-client'

class NotificationsStore {
  newNotificationDTO: Nullable<NotificationEventDTO> = null
  notificationsDTO: Nullable<NotificationsApiDTO> = null
  socket: Nullable<Socket> = null

  constructor() {
    makeAutoObservable(this)
  }

  addNewNotification(notification: NotificationEventDTO) {
    this.newNotificationDTO = notification
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
    this.disconnect()
  }
}

export const notificationsStore = new NotificationsStore()
