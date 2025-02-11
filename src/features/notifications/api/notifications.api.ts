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

    this.socket.on('connect', () => {
      console.log('connect socket AAAAAAAAA')
    })

    this.socket.on('disconnect', (e) => {
      console.log('disconnect socket', e)
    })

    this.socket.on('connect_error', (err) => {
      console.error('Connection error:', err)
    })

    this.socket.onAny((event, ...args) => {
      console.log('Event received:', event, args)
    })
  }

  static disconnect() {
    NotificationsSocketApi.socket?.disconnect()
  }
}
