import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { NotificationsEndpoints } from './notifications.endpoints'
import { NotificationsDTO, getAllNotificationsType } from './notifications.type'

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
  }: getAllNotificationsType) {
    const res = await this.instance.get<NotificationsDTO>(
      NotificationsEndpoints.getAllNotifications(cursor),
      {
        params: {
          isRead,
          pageSize,
          sortDirection,
        },
        signal,
      }
    )

    return res.data
  }

  public async markAsRead(ids: number[]) {
    const res = await this.instance.put(NotificationsEndpoints.markAsRead, ids)

    return res.data
  }
}

export const notificationsApi = new NotificationsApi(instance)
