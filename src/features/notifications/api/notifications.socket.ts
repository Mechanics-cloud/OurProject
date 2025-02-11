import { Environments, Nullable, getFromLocalStorage } from '@/common'
import io, { Socket } from 'socket.io-client'

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

    //todo delete
    this.socket.on('connect', () => {
      console.log('connect socket')
    })

    this.socket.on('disconnect', (e) => {
      console.log('disconnect socket', e)
    })
  }

  static disconnect() {
    NotificationsSocketApi.socket?.disconnect()
  }
}
