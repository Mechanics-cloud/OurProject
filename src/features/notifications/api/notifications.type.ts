export enum SocketEvents {
  ERROR = 'error',
  NOTIFICATIONS = 'notifications',
}

export type NotificationEventDTO = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type EventError = {
  error: SocketEvents
  message: string
}

export type GetAllNotificationsType = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  signal?: AbortSignal
  sortBy?: 'notifyAt'
  sortDirection?: 'asc' | 'desc'
}

type NotificationDTO = { createdAt: string } & Omit<
  NotificationEventDTO,
  'clientId' | 'notifyAt'
>

export type NotificationsApiDTO = {
  items: Array<NotificationDTO>
  notReadCount: number
  pageSize: number
  totalCount: number
}
