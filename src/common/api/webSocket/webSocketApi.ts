import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { MessengerSocketEvents } from '@/features/messenger/api'
import { NotificationSocketEvents } from '@/features/notifications/api'
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client'

import { GlobalSocketEvents } from './GlobalSocketEvents'

type EventError = {
  error: GlobalSocketEvents | MessengerSocketEvents | NotificationSocketEvents
  message: string
}

type Listener = (...args: any[]) => void

type FeatureType = 'messenger' | 'notification'

type EventsRegistry = {
  [eventName: string]: {
    callback: Listener
    feature: FeatureType
  }[]
}

export class WebSocketApi {
  static accessToken: Nullable<string> = null
  static socket: Nullable<Socket> = null
  private static eventsRegistry: EventsRegistry = {}

  static connectWS() {
    const baseUrl = Environments.SOCKET_URL || ''

    this.accessToken = getFromLocalStorage(StorageKeys.AccessToken)

    const socketOptions: Partial<ManagerOptions & SocketOptions> = {
      query: {
        accessToken: this.accessToken,
      },
    }

    console.log('connectWS', this.eventsRegistry)
    this.socket = io(baseUrl, socketOptions)
    this.socket.on(GlobalSocketEvents.CONNECT, () => {
      console.log('global WS connected')
      this.reregisterEvents()
    })
    this.socket.on(GlobalSocketEvents.ERROR, (err: EventError) => {
      responseErrorHandler(new Error(err.message))
    })
  }

  static disconnect() {
    if (this.socket) {
      this.offAllListeners()
      this.socket.disconnect()
      this.socket = null
      console.log('global WS disconnected')
    }
  }

  static emit(eventName: string, ...args: any[]) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(eventName, ...args)
    } else {
      responseErrorHandler(
        new Error(`Socket not connected, cannot emit: ${eventName}`)
      )
    }
  }

  static off({ feature }: { feature: FeatureType }) {
    if (!this.socket) {
      return
    }
    console.log('off feature', feature)
    Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
      const remainingListeners = listeners.filter(
        (listener) => listener.feature !== feature
      )

      listeners
        .filter((listener) => listener.feature === feature)
        .forEach((listener) => {
          if (this.socket) {
            console.log(`${eventName} disconnected`)
            this.socket.off(eventName, listener.callback)
          }
        })

      if (remainingListeners.length === 0) {
        delete this.eventsRegistry[eventName]
      } else {
        this.eventsRegistry[eventName] = remainingListeners
      }
    })
  }

  static on({
    callback,
    eventName,
    feature,
  }: {
    callback: Listener
    eventName: string
    feature: FeatureType
  }) {
    console.log('on event', eventName)
    if (this.socket && this.socket.connected) {
      console.log(`${eventName} connected`)
      this.socket.on(eventName, callback)
    }
    if (!this.eventsRegistry[eventName]) {
      this.eventsRegistry[eventName] = []
    }

    this.eventsRegistry[eventName].push({ callback, feature })
  }

  private static offAllListeners() {
    this.socket!.off(GlobalSocketEvents.CONNECT)
    this.socket!.off(GlobalSocketEvents.ERROR)

    Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
      listeners.forEach(() => {
        console.log(`${eventName} disconnected`)
        this.socket!.off(eventName)
      })
    })
    console.log('clean off', this.eventsRegistry)
    this.eventsRegistry = {}
  }

  private static reregisterEvents() {
    if (this.socket && this.socket.connected) {
      Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
        listeners.forEach(({ callback }) => {
          console.log(`${eventName} reconnected`)
          this.socket!.on(eventName, callback)
        })
      })
    }
  }
}
