import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { NotificationsEndpoints } from './notifications.endpoints'
import {
  GetAllNotificationsType,
  NotificationsApiDTO,
} from './notifications.type'

class NotificationsApi {
  constructor(private instance: AxiosInstance) {}

  public async deleteNotification(id: number) {
    const res = await this.instance.delete(
      NotificationsEndpoints.deleteNotifications(id)
    )

    return res.data
  }

  public async getAllNotifications({
    cursor = 0,
    isRead,
    pageSize,
    signal,
    sortBy,
    sortDirection,
  }: GetAllNotificationsType) {
    const res = await this.instance.get<NotificationsApiDTO>(
      NotificationsEndpoints.getAllNotifications(cursor),
      {
        params: {
          isRead,
          pageSize,
          sortBy,
          sortDirection,
        },
        signal,
      }
    )

    return res.data
  }

  public async markAsRead(idsToDelete: number[]) {
    const res = await this.instance.put(NotificationsEndpoints.markAsRead, {
      ids: idsToDelete,
    })

    return res.data
  }
}

export const notificationsApi = new NotificationsApi(instance)
