import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client'

import {
  EventError,
  EventsRegistry,
  GlobalSocketEvents,
  OffArgsByEventName,
  OffArgsByFeatureType,
  OnArgsType,
} from './webSocket.types'

export class WebSocketApi {
  static accessToken: Nullable<string> = null
  static socket: Nullable<Socket> = null
  private static eventsRegistry: EventsRegistry = {}

  static connectGlobalWS() {
    if (this.socket) {
      return
    }

    const baseUrl = Environments.SOCKET_URL || ''

    this.accessToken = getFromLocalStorage(StorageKeys.AccessToken)

    const socketOptions: Partial<ManagerOptions & SocketOptions> = {
      query: {
        accessToken: this.accessToken,
      },
    }

    this.socket = io(baseUrl, socketOptions)
    this.socket.on(GlobalSocketEvents.CONNECT, () => {
      console.log(`global WS connected`)
      this.reregisterEvents()
    })
    this.socket.on(GlobalSocketEvents.ERROR, (err: EventError) => {
      responseErrorHandler(new Error(err.message))
    })
  }

  static disconnectGlobalWS() {
    if (this.socket) {
      this.offAllListeners()
      this.socket.disconnect()
      this.socket = null
      console.log(`global WS disconnected`)
    }
  }

  static emit(eventName: string, ...args: any[]) {
    if (this.socket && this.socket.connected) {
      console.log(`${eventName} emitted`)
      this.socket.emit(eventName, ...args)
    } else {
      responseErrorHandler(
        new Error(`Socket not connected, cannot emit: ${eventName}`)
      )
    }
  }

  static offByEventName<T extends string>({
    eventName,
  }: OffArgsByEventName<T>) {
    if (!this.socket) {
      return
    }
    Object.entries(this.eventsRegistry).forEach(([_eventName, _]) => {
      if (_eventName === eventName) {
        console.log(`${eventName} disconnected in offByEventName`)
        this.socket!.off(eventName)
        delete this.eventsRegistry[eventName]
      }
    })
  }

  static offByFeature({ feature }: OffArgsByFeatureType) {
    if (!this.socket) {
      return
    }
    Object.entries(this.eventsRegistry).forEach(([eventName, listener]) => {
      if (listener.feature === feature) {
        console.log(`${eventName} disconnected in offByFeature`)
        this.socket!.off(eventName)
        delete this.eventsRegistry[eventName]
      }
    })
  }

  static on<T extends string>({ callback, eventName, feature }: OnArgsType<T>) {
    if (this.socket && this.socket.connected) {
      console.log(`${eventName} connected`)
      this.socket.on(eventName, callback)
    }
    this.eventsRegistry[eventName] = { callback, feature }
  }

  private static offAllListeners() {
    this.socket!.off(GlobalSocketEvents.CONNECT)
    this.socket!.off(GlobalSocketEvents.ERROR)
    Object.entries(this.eventsRegistry).forEach(([eventName, _]) => {
      console.log(`${eventName} disconnected in offAllListeners`)
      this.socket!.off(eventName)
    })
    this.eventsRegistry = {}
  }

  private static reregisterEvents() {
    if (this.socket && this.socket.connected) {
      Object.entries(this.eventsRegistry).forEach(
        ([eventName, { callback }]) => {
          console.log(`${eventName} reconnected`)
          this.socket!.on(eventName, callback)
        }
      )
    }
  }
}
