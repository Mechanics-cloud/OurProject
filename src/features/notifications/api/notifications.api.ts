import { Environments, Nullable, getFromLocalStorage } from '@/common'
import io, { Socket } from 'socket.io-client'

class NotificationsSocketApi {
  static socket: Nullable<Socket> = null

  // on<K extends keyof WebSocketEvents>(event: K, callback: WebSocketEvents[K]) {
  //   NotificationsSocketApi.socket?.on(event, callback);
  // }

  // sendMessage(message: { content: string; receiverId: number }) {
  //   NotificationsSocketApi.socket?.emit('RECEIVE_MESSAGE', message, (acknowledgment: any) => {
  //     console.log('Message acknowledged:', acknowledgment);
  //   });
  // }
  //
  // updateMessage(message: { id: number; content: string }) {
  //   NotificationsSocketApi.socket?.emit('UPDATE_MESSAGE', message);
  // }
  //
  // deleteMessage(messageId: number) {
  //   NotificationsSocketApi.socket?.emit('MESSAGE_DELETED', messageId);
  // }

  static createConnection() {
    const socketOptions = {
      query: {
        accessToken: getFromLocalStorage('accessToken'),
      },
      withCredentials: true,
    }

    this.socket = io(Environments.SOCKED_URL || '', socketOptions)

    this.socket.on('connect', () => {
      console.log('connect')
    })

    this.socket.on('disconnect', (e) => {
      console.log('disconnect', e)
    })
  }

  disconnect() {
    NotificationsSocketApi.socket?.disconnect()
  }
}

export default NotificationsSocketApi
