import { Environments, Nullable, getFromLocalStorage } from '@/common'
import { Socket, io } from 'socket.io-client'

export class NotificationsSocketApi {
  static socket: Nullable<Socket> = null

  static createConnection() {
    const socketOptions = {
      query: {
        accessToken: getFromLocalStorage('accessToken'),
      },
    }

    this.socket = io(
      Environments.SOCKET_URL || 'https://inctagram.work',
      socketOptions
    )
  }

  static disconnect() {
    NotificationsSocketApi.socket?.disconnect()
  }
}
