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
