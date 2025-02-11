export type Notification = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type MessageType = {
  createdAt: string
  id: number
  messageText: string
  messageType: string
  ownerId: number
  receiverId: number
  status: 'READ' | 'RECEIVED' | 'SENT'
  updatedAt: string
}

export type WebSocketEvents = {
  ERROR: (error: { message: string }) => void
  MESSAGE_DELETED: (messageId: number) => void
  MESSAGE_SENT: (message: MessageType) => void
  NOTIFICATION: (notification: Notification) => void
  RECEIVE_MESSAGE: (message: MessageType) => void
  UPDATE_MESSAGE: (message: MessageType) => void
}
