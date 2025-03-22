import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client'

import { GlobalSocketEvents } from './GlobalSocketEvents'

type EventListener = (...args: any[]) => void

type FeatureType = 'messenger' | 'notification'

interface EventsRegistry {
  [eventName: string]: {
    callback: EventListener
    feature: FeatureType
  }[]
}

export class WebSocketApi {
  static accessToken: Nullable<string> = null
  static socket: Nullable<Socket> = null
  private static connectionCallbacks: Array<() => void> = []
  private static eventsRegistry: EventsRegistry = {}

  static connectWS() {
    const baseUrl = Environments.SOCKET_URL || ''

    this.accessToken = getFromLocalStorage(StorageKeys.AccessToken)

    const socketOptions: Partial<ManagerOptions & SocketOptions> = {
      query: {
        accessToken: this.accessToken,
      },
    }

    this.socket = io(baseUrl, socketOptions)
    this.socket.on(GlobalSocketEvents.CONNECT, () => {
      console.log('global WS Connected')

      // Execute all pending connection callbacks
      this.connectionCallbacks.forEach((callback) => callback())
      this.connectionCallbacks = []

      // Re-register all events after reconnection
      this.reregisterEvents()
    })
  }

  static disconnect() {
    if (this.socket) {
      console.log('global WS disconnected')
      this.offAllListeners()
      this.socket.off(GlobalSocketEvents.CONNECT)
      this.socket.disconnect()
      this.socket = null
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

  static offFeature({ feature }: { feature: FeatureType }) {
    if (!this.socket) {
      return
    }

    Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
      const remainingListeners = listeners.filter(
        (listener) => listener.feature !== feature
      )

      // Remove all listeners for this event
      listeners
        .filter((listener) => listener.feature === feature)
        .forEach((listener) => {
          if (this.socket) {
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
    callback: EventListener
    eventName: string
    feature: FeatureType
  }) {
    if (!this.eventsRegistry[eventName]) {
      this.eventsRegistry[eventName] = []
    }

    this.eventsRegistry[eventName].push({ callback, feature })

    if (this.socket && this.socket.connected) {
      this.socket.on(eventName, callback)
    }
  }

  static onceConnected(callback: () => void) {
    if (this.socket && this.socket.connected) {
      callback()
    } else {
      this.connectionCallbacks.push(callback)
    }
  }

  private static offAllListeners() {
    if (!this.socket) {
      return
    }

    Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
      listeners.forEach(() => {
        this.socket!.off(eventName)
      })
    })
    this.eventsRegistry = {}
  }

  private static reregisterEvents() {
    if (!this.socket) {
      return
    }

    Object.entries(this.eventsRegistry).forEach(([eventName, listeners]) => {
      listeners.forEach(({ callback }) => {
        this.socket!.on(eventName, callback)
      })
    })
  }
}
