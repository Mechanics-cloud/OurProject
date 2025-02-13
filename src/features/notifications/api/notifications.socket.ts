import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { updateToken } from '@/common/api/utils/updateToken'
import { Socket, io } from 'socket.io-client'

export class NotificationsSocketApi {
  static socket: Nullable<Socket> = null

  static createConnection() {
    const socketOptions = {
      query: {
        accessToken: getFromLocalStorage('accessToken'),
      },
    }

    this.socket = io(Environments.SOCKET_URL || '', socketOptions)
  }

  static disconnect() {
    NotificationsSocketApi.socket?.disconnect()
  }
}

async function refetchAccessToken() {
  const accessToken = getFromLocalStorage('accessToken')

  if (!accessToken) {
    try {
      await updateToken()
    } catch (error) {
      responseErrorHandler(error)

      return null
    }
  }

  return getFromLocalStorage('accessToken')
}
