export type Notification = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export enum SocketEvents {
  ERROR = 'error',
  NOTIFICATIONS = 'notifications',
}

export type WebSocketError = {
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

export type NotificationsDTO = {
  items: Array<
    { createdAt: string } & Omit<Notification, 'clientId' | 'notifyAt'>
  >
  notReadCount: number
  pageSize: number
  totalCount: number
}
